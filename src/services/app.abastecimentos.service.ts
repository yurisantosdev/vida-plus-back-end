/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { VeiculosType } from 'src/types/VeiculosType';
import { AbastecimentosType } from 'src/types/AbastecimentosType';

@Injectable()
export class AbastecimentosService {
  // eslint-disable-next-line prettier/prettier
  constructor(readonly prisma: PrismaService) { }

  async create(abastecimento: AbastecimentosType) {
    try {
      const { veiculo, ...dataToSave } = abastecimento;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.abastecimentos.create(
          {
            data: {
              ...dataToSave,
              abcodigo: randomUUID(),
            },
          }
        );
      });

      return { status: true, message: 'Abastecimento cadastrado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar o abastecimento, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(abastecimento: AbastecimentosType) {
    try {
      const { veiculo, ...dataToSave } = abastecimento;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.abastecimentos.update(
          {
            where: {
              abcodigo: abastecimento.abcodigo,
            },
            data: {
              ...dataToSave,
            },
          }
        );
      });

      return { status: true, message: 'Abastecimento atulizado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar o abastecimento, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async delete(abcodigo: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.abastecimentos.deleteMany({
          where: {
            abcodigo,
          },
        });
      });

      return { status: true, message: 'Abastecimento deletado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível deletar o abastecimento, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async find(abcodigo: string) {
    try {
      let abastecimento;

      await this.prisma.$transaction(async (prisma) => {
        abastecimento = await prisma.abastecimentos.findFirst({
          where: {
            abcodigo,
          },
        });
      });

      return { status: true, message: 'Abastecimento consultado com sucesso!', abastecimento };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar o abastecimento, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(uscodigo: string) {
    try {
      let abastecimentos;

      await this.prisma.$transaction(async (prisma) => {
        abastecimentos = await prisma.abastecimentos.findMany({
          where: {
            abusuario: uscodigo,
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
      });

      return { status: true, message: 'Abastecimentos consultados com sucesso!', abastecimentos };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar os abastecimentos, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAllVeiculo(vecodigo: string) {
    try {
      let abastecimentos;

      await this.prisma.$transaction(async (prisma) => {
        abastecimentos = await prisma.abastecimentos.findMany({
          where: {
            abveiculo: vecodigo,
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
      });

      return { status: true, message: 'Abastecimentos consultados com sucesso!', abastecimentos };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar os abastecimentos, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }
}
