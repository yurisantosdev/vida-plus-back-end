/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { CategoriasTransacoesType } from 'src/types/CategoriasTransacoesType';

@Injectable()
export class CategoriasTransacoesService {
  constructor(readonly prisma: PrismaService) { }

  async create(categoria: CategoriasTransacoesType) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.categoriasTransacoes.create({
          data: {
            ...categoria,
            ctcodigo: randomUUID(),
            ctativo: categoria.ctativo !== false,
          },
        });
      });

      return { status: true, message: 'Categoria cadastrada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar a categoria, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(categoria: CategoriasTransacoesType) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.categoriasTransacoes.update({
          where: {
            ctcodigo: categoria.ctcodigo,
          },
          data: {
            ...categoria,
          },
        });
      });

      return { status: true, message: 'Categoria atualizada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar a categoria, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(usuarioId: string) {
    try {
      const categorias = await this.prisma.categoriasTransacoes.findMany({
        where: {
          ctusuario: usuarioId,
          ctativo: true,
        },
        include: {
          subcategorias: {
            where: {
              sctativo: true,
            },
          },
        },
        orderBy: {
          ctcategoria: 'asc',
        },
      });

      return { status: true, data: categorias };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível buscar as categorias, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(codigo: string) {
    try {
      const categoria = await this.prisma.categoriasTransacoes.findUnique({
        where: {
          ctcodigo: codigo,
        },
        include: {
          subcategorias: {
            where: {
              sctativo: true,
            },
          },
          transacoes: {
            take: 10,
            orderBy: {
              tsquando: 'desc',
            },
          },
        },
      });

      return { status: true, data: categoria };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível buscar a categoria, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async delete(codigo: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.categoriasTransacoes.update({
          where: {
            ctcodigo: codigo,
          },
          data: {
            ctativo: false,
          },
        });
      });

      return { status: true, message: 'Categoria desativada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível desativar a categoria, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }
} 