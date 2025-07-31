/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { ManutencoesType } from 'src/types/ManutencoesType';
import { DespesasType } from 'src/types/DespesasType';

@Injectable()
export class DespesasService {
  // eslint-disable-next-line prettier/prettier
  constructor(readonly prisma: PrismaService) { }

  async create(despesas: DespesasType) {
    try {
      const { veiculo, usuario, ...dataToSave } = despesas;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.despesas.create(
          {
            data: {
              ...dataToSave,
              dpcodigo: randomUUID(),
            },
          }
        );
      });

      return { status: true, message: 'Despesa cadastrada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar a despesa, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(despesas: DespesasType) {
    try {
      const { veiculo, usuario, ...dataToSave } = despesas;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.despesas.update(
          {
            where: {
              dpcodigo: despesas.dpcodigo,
            },
            data: {
              ...dataToSave,
            },
          }
        );
      });

      return { status: true, message: 'Despesa atualizada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar a despesa, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async delete(dpcodigo: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.despesas.deleteMany({
          where: {
            dpcodigo,
          },
        });
      });

      return { status: true, message: 'Despesa deletada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível deletar a despesa, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async find(dpcodigo: string) {
    try {
      let despesa;

      await this.prisma.$transaction(async (prisma) => {
        despesa = await prisma.despesas.findFirst({
          where: {
            dpcodigo,
          },
        });
      });

      return { status: true, message: 'Despesa consultada com sucesso!', despesa };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar a despesa, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(uscodigo: string) {
    try {
      let despesas;

      await this.prisma.$transaction(async (prisma) => {
        despesas = await prisma.despesas.findMany({
          where: {
            dpveiculo: uscodigo,
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
      });

      return { status: true, message: 'Despesas consultadas com sucesso!', despesas };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar as despesas, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAllVeiculo(vecodigo: string) {
    try {
      let despesas;

      await this.prisma.$transaction(async (prisma) => {
        despesas = await prisma.despesas.findMany({
          where: {
            dpveiculo: vecodigo,
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
      });

      return { status: true, message: 'Despesas consultadas com sucesso!', despesas };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar as despesas, por favor tente novamente!';

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
        const resultado = await prisma.despesas.findMany({
          where: {
            dpusuario: uscodigo,
            dpquando: {
              gte: `${anoAtual}-01-01`,
              lte: `${anoAtual}-12-31`,
            },
          },
          select: {
            dpquando: true,
            dpvalor: true,
          },
          orderBy: {
            dpquando: 'asc',
          },
        });

        const agrupado: Record<string, number> = {};
        for (const reg of resultado) {
          const [ano, mes] = reg.dpquando.split('-');
          const key = `${ano}-${mes}`;
          agrupado[key] = (agrupado[key] || 0) + Number(reg.dpvalor);
        }

        for (let mes = 0; mes < 12; mes++) {
          const mesStr = String(mes + 1).padStart(2, '0');
          const key = `${anoAtual}-${mesStr}`;
          valores.push({
            name: `${meses[mes]}`,
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
