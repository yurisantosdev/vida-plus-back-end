/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { buscarLatitudeLongitude } from 'src/helpers/BuscaEndereco';

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
        select: {
          uscodigo: true,
          usemail: true,
          usnome: true,
          createdAt: true,
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
        const localizacaoCasaUsuario = await buscarLatitudeLongitude(user);

        const newDataUser = {
          ...user,
          localizacaoCasaUsuario
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
