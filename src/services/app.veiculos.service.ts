/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { VeiculosType } from 'src/types/VeiculosType';

@Injectable()
export class VeiculosService {
  // eslint-disable-next-line prettier/prettier
  constructor(readonly prisma: PrismaService) { }

  async create(veiculo: VeiculosType) {
    try {
      const { usuario, ...dataToSave } = veiculo;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.veiculos.create(
          {
            data: {
              ...dataToSave,
              vecodigo: randomUUID(),
            },
          }
        );
      });

      return { status: true, message: 'Veículo cadastrado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar o veículo, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(veiculo: VeiculosType) {
    try {
      const { usuario, ...dataToSave } = veiculo;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.veiculos.update(
          {
            where: {
              vecodigo: veiculo.vecodigo,
            },
            data: {
              ...dataToSave,
            },
          }
        );
      });

      return { status: true, message: 'Veículo atualizado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar o veículo, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async delete(vecodigo: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.abastecimentos.deleteMany({
          where: {
            abveiculo: vecodigo,
          },
        });

        await prisma.manutencoes.deleteMany({
          where: {
            mtveiculo: vecodigo,
          },
        });

        await prisma.despesas.deleteMany({
          where: {
            dpveiculo: vecodigo,
          },
        });

        await prisma.veiculos.delete(
          {
            where: {
              vecodigo,
            },
          }
        );
      });

      return { status: true, message: 'Veículos deletado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível deletar o veículo, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async find(vecodigo: string) {
    try {
      let veiculo;

      await this.prisma.$transaction(async (prisma) => {
        veiculo = await prisma.veiculos.findFirst({
          where: {
            vecodigo,
          },
        });
      });

      return { status: true, message: 'Veículo consultado com sucesso!', veiculo };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar o veículo, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(uscodigo: string) {
    try {
      let veiculos;

      await this.prisma.$transaction(async (prisma) => {
        veiculos = await prisma.veiculos.findMany({
          where: {
            veusuario: uscodigo,
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
      });

      return { status: true, message: 'Veículos consultados com sucesso!', veiculos };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar os veículos, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }
}
