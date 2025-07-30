/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
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

  async findTotalGasto(uscodigo: string) {
    try {
      const meses = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];

      const anoAtual = new Date().getFullYear();
      const valores: { name: string; value: number }[] = [];

      await this.prisma.$transaction(async (prisma) => {
        const resultado = await prisma.abastecimentos.findMany({
          where: {
            abusuario: uscodigo,
            createdAt: {
              gte: new Date(`${anoAtual}-01-01T00:00:00.000Z`),
              lte: new Date(`${anoAtual}-12-31T23:59:59.999Z`)
            },
          },
          select: {
            createdAt: true,
            abvalortotal: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

        const agrupado: Record<string, number> = {};
        for (const reg of resultado) {
          const data = new Date(reg.createdAt);
          const key = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
          agrupado[key] = (agrupado[key] || 0) + Number(reg.abvalortotal);
        }

        for (let mes = 0; mes < 12; mes++) {
          const key = `${anoAtual}-${String(mes + 1).padStart(2, '0')}`;
          valores.push({
            name: `${meses[mes]} (${String(anoAtual).slice(2)})`,
            value: parseFloat((agrupado[key] || 0).toFixed(2)),
          });
        }
      });

      const valorTotal = valores.reduce((acc, cur) => acc + cur.value, 0);

      return {
        status: true,
        message: 'Gastos do ano atual consultados com sucesso!',
        valores,
        valorTotal: parseFloat(valorTotal.toFixed(2)),
      };

    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Erro ao consultar os gastos do ano atual.';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }
}
