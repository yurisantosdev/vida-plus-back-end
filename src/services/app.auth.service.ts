/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    private readonly jwtService: JwtService,
    readonly prisma: PrismaService,
  ) { }

  async login(email: string, senha: string) {
    try {
      const userPasswordPerfil = await this.prisma.usuarios.findFirst({
        where: {
          usemail: email,
        },
        select: {
          ussenha: true,
        },
      });
      const user = await this.prisma.usuarios.findFirst({
        where: {
          usemail: email,
        },
      });

      const isMatchPassword = await bcrypt.compare(senha, userPasswordPerfil.ussenha);

      if (!isMatchPassword) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Senha Inválida!',
          },
          HttpStatus.FORBIDDEN,
        );
      } else if (user && isMatchPassword) {
        const payload = { acess: email, sub: senha };

        const newDataUser = {
          ...user,
        };

        return {
          access_token: this.jwtService.sign(payload),
          user: newDataUser,
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi Possível Realizar o Login!',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
