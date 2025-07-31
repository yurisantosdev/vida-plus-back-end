/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { ManutencoesType } from 'src/types/ManutencoesType';

@Injectable()
export class ManutencoesService {
  // eslint-disable-next-line prettier/prettier
  constructor(readonly prisma: PrismaService) { }

  async create(manutencao: ManutencoesType) {
    try {
      const { veiculo, usuario, ...dataToSave } = manutencao;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.manutencoes.create(
          {
            data: {
              ...dataToSave,
              mtcodigo: randomUUID(),
            },
          }
        );
      });

      return { status: true, message: 'Manutenção cadastrada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar a manutenção, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(manutencao: ManutencoesType) {
    try {
      const { veiculo, usuario, ...dataToSave } = manutencao;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.manutencoes.update(
          {
            where: {
              mtcodigo: manutencao.mtcodigo,
            },
            data: {
              ...dataToSave,
            },
          }
        );
      });

      return { status: true, message: 'Manutenção atualizada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar a manutenção, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async delete(mtcodigo: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.manutencoes.deleteMany({
          where: {
            mtcodigo,
          },
        });
      });

      return { status: true, message: 'Manutenção deletada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível deletar a manutenção, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async find(mtcodigo: string) {
    try {
      let manutencao;

      await this.prisma.$transaction(async (prisma) => {
        manutencao = await prisma.manutencoes.findFirst({
          where: {
            mtcodigo,
          },
        });
      });

      return { status: true, message: 'Manutenção consultada com sucesso!', manutencao };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar a manutenção, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(uscodigo: string) {
    try {
      let manutencoes;

      await this.prisma.$transaction(async (prisma) => {
        manutencoes = await prisma.manutencoes.findMany({
          where: {
            mtusuario: uscodigo,
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
      });

      return { status: true, message: 'Manutenções consultadas com sucesso!', manutencoes };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar as manutenções, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAllVeiculo(vecodigo: string) {
    try {
      let manutencoes;

      await this.prisma.$transaction(async (prisma) => {
        manutencoes = await prisma.manutencoes.findMany({
          where: {
            mtveiculo: vecodigo,
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
      });

      return { status: true, message: 'Manutenções consultadas com sucesso!', manutencoes };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar as manutenções, por favor tente novamente!';

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
        const resultado = await prisma.manutencoes.findMany({
          where: {
            mtusuario: uscodigo,
            mtquando: {
              gte: `${anoAtual}-01-01`,
              lte: `${anoAtual}-12-31`,
            },
          },
          select: {
            mtquando: true,
            mtvalor: true,
          },
          orderBy: {
            mtquando: 'asc',
          },
        });

        const agrupado: Record<string, number> = {};
        for (const reg of resultado) {
          const [ano, mes] = reg.mtquando.split('-');
          const key = `${ano}-${mes}`;
          agrupado[key] = (agrupado[key] || 0) + Number(reg.mtvalor);
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
