/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { ContasType } from 'src/types/ContasType';

@Injectable()
export class ContasService {
  constructor(readonly prisma: PrismaService) { }

  async create(conta: ContasType) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.contas.create({
          data: {
            ...conta,
            ctcodigo: randomUUID(),
            ctsaldo: conta.ctsaldo || 0,
            ctsaldoInicial: conta.ctsaldoInicial || 0,
            ctativo: conta.ctativo !== false,
          },
        });
      });

      return { status: true, message: 'Conta cadastrada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar a conta, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(conta: ContasType) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.contas.update({
          where: {
            ctcodigo: conta.ctcodigo,
          },
          data: {
            ...conta,
          },
        });
      });

      return { status: true, message: 'Conta atualizada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar a conta, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(usuarioId: string) {
    try {
      const contas = await this.prisma.contas.findMany({
        where: {
          ctusuario: usuarioId,
          ctativo: true,
        },
        include: {
          instituicao: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return { status: true, data: contas };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível buscar as contas, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(codigo: string) {
    try {
      const conta = await this.prisma.contas.findUnique({
        where: {
          ctcodigo: codigo,
        },
        include: {
          instituicao: true,
          transacoes: {
            orderBy: {
              tsquando: 'desc',
            },
            take: 10,
          },
        },
      });

      return { status: true, data: conta };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível buscar a conta, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async delete(codigo: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.contas.update({
          where: {
            ctcodigo: codigo,
          },
          data: {
            ctativo: false,
          },
        });
      });

      return { status: true, message: 'Conta desativada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível desativar a conta, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }
} 