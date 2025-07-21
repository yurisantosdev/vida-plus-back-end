/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { ListaComprasType } from 'src/types/ListaComprasType';

@Injectable()
export class ListaComprasService {
  // eslint-disable-next-line prettier/prettier
  constructor(readonly prisma: PrismaService) { }

  async create(listaCompra: ListaComprasType) {
    try {
      const { usuario, itensListaCompras, ...dataToSave } = listaCompra;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.listaCompras.create(
          {
            data: {
              ...dataToSave,
              lccodigo: randomUUID(),
              ItensListaCompras: {
                create: itensListaCompras.map(({ itcodigo, listaCompra, ...item }) => ({
                  itcodigo: itcodigo ?? randomUUID(),
                  ...item
                }))
              }
            },
          }
        );
      });

      return { status: true, message: 'Lista de compras cadastrada com sucesso!' };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar a lista de compras, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(listaCompra: ListaComprasType) {
    try {
      const { usuario, itensListaCompras, ...dataToSave } = listaCompra;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.listaCompras.update(
          {
            where: {
              lccodigo: listaCompra.lccodigo,
            },
            data: {
              ...dataToSave,
              ItensListaCompras: {
                deleteMany: {},
                create: itensListaCompras.map(({ itcodigo, listaCompra, ...item }) => ({
                  itcodigo: itcodigo ?? randomUUID(),
                  ...item
                }))
              }
            },
          }
        );
      });

      return { status: true, message: 'Lista de compras atualizada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar a lista de compras, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async delete(lccodigo: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.itensListaCompras.deleteMany(
          {
            where: {
              itlista: lccodigo,
            },
          }
        );

        await prisma.listaCompras.delete(
          {
            where: {
              lccodigo: lccodigo,
            },
          }
        );
      });

      return { status: true, message: 'Lista de compras deletada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível deletar a lista de compras, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async find(lccodigo: string) {
    try {
      let listaCompras;

      await this.prisma.$transaction(async (prisma) => {
        listaCompras = await prisma.listaCompras.findMany({
          where: {
            lccodigo: lccodigo,
          },
          include: {
            ItensListaCompras: true,
          },
        });
      });

      return { status: true, message: 'Lista de compras consultada com sucesso!', listaCompras };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar a lista de compras, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(uscodigo: string) {
    try {
      let listaCompras;

      await this.prisma.$transaction(async (prisma) => {
        listaCompras = await prisma.listaCompras.findMany({
          where: {
            lcusuario: uscodigo,
          },
          include: {
            ItensListaCompras: true,
          },
        });
      });

      return { status: true, message: 'Lista de compras consultada com sucesso!', listaCompras };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar a lista de compras, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }
}
