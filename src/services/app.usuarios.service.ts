/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { UsuarioType } from 'src/types/UsuariosType';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsuarioService {
  // eslint-disable-next-line prettier/prettier
  constructor(readonly prisma: PrismaService) { }

  async create(usuario: UsuarioType) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        const senhaCrypt = await bcrypt.hash(usuario.ussenha, saltOrRounds);
        console.log(senhaCrypt)
        await prisma.usuarios.create(
          {
            data: {
              ...usuario,
              uscodigo: randomUUID(),
              ussenha: senhaCrypt,
            },
          }
        );
      });

      return { status: true, message: 'Usuário cadastrado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar o usuário, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(usuario: UsuarioType) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.usuarios.update(
          {
            where: {
              uscodigo: usuario.uscodigo,
            },
            data: {
              ...usuario,
            },
          }
        );
      });

      return { status: true, message: 'Usuário atualizado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar o usuário, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }
}
