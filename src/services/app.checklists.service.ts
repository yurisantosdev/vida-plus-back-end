/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { ChecklistsType } from 'src/types/ChecklistsType';

@Injectable()
export class ChecklistsService {
  // eslint-disable-next-line prettier/prettier
  constructor(readonly prisma: PrismaService) { }

  async create(checklist: ChecklistsType) {
    try {
      const { usuario, itensChecklists, ...dataToSave } = checklist;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.checklists.create(
          {
            data: {
              ...dataToSave,
              ckcodigo: randomUUID(),
              itensChecklists: {
                create: itensChecklists.map(({ iccodigo, checklist, ...item }) => ({
                  iccodigo: randomUUID(),
                  ...item
                }))
              }
            },
          }
        );
      });

      return { status: true, message: 'Checklist cadastrado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar o checklist, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(checklist: ChecklistsType) {
    try {
      const { usuario, itensChecklists, ...dataToSave } = checklist;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.checklists.update({
          where: {
            ckcodigo: checklist.ckcodigo,
          },
          data: {
            ...dataToSave,
          },
        });

        const itensExistentes = await prisma.itensChecklists.findMany({
          where: {
            checklist: {
              ckcodigo: checklist.ckcodigo,
            },
          },
          select: { iccodigo: true },
        });

        const iccodigosExistentes = itensExistentes.map((item) => item.iccodigo);

        const novosItens = itensChecklists.filter((item) => !item.iccodigo);
        const itensParaAtualizar = itensChecklists.filter((item) => item.iccodigo);
        const iccodigosRecebidos = itensParaAtualizar.map((item) => item.iccodigo);

        const itensParaDeletar = iccodigosExistentes.filter(
          (iccodigo) => !iccodigosRecebidos.includes(iccodigo)
        );

        if (itensParaDeletar.length > 0) {
          await prisma.itensChecklists.deleteMany({
            where: {
              iccodigo: { in: itensParaDeletar },
            },
          });
        }

        for (const item of itensParaAtualizar) {
          const { iccodigo, checklist, ...dadosItem } = item;

          await prisma.itensChecklists.update({
            where: { iccodigo },
            data: {
              ...dadosItem,
            },
          });
        }

        const codigoChecklist = checklist.ckcodigo;

        for (const item of novosItens) {
          const { checklist, ...dadosItem } = item;

          await prisma.itensChecklists.create({
            data: {
              iccodigo: randomUUID(),
              icchecklist: codigoChecklist,
              ...dadosItem,
            },
          });
        }
      });

      return { status: true, message: 'Checklist atualizado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar o checklist, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async delete(ckcodigo: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.itensChecklists.deleteMany(
          {
            where: {
              icchecklist: ckcodigo,
            },
          }
        );

        await prisma.checklists.delete(
          {
            where: {
              ckcodigo: ckcodigo,
            },
          }
        );
      });

      return { status: true, message: 'Checklist deletado com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível deletar o checklist, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async find(ckcodigo: string) {
    try {
      let checklist;

      await this.prisma.$transaction(async (prisma) => {
        checklist = await prisma.checklists.findFirst({
          where: {
            ckcodigo: ckcodigo,
          },
          include: {
            itensChecklists: true,
          },
        });
      });

      return { status: true, message: 'Checklists consultado com sucesso!', checklist };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar os checklists, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(uscodigo: string) {
    try {
      let checklists;
      let finalizados;
      let pendentes;

      await this.prisma.$transaction(async (prisma) => {
        pendentes = await prisma.checklists.count({
          where: {
            ckusuario: uscodigo,
            ckfinalizado: false,
          },
        });

        finalizados = await prisma.checklists.count({
          where: {
            ckusuario: uscodigo,
            ckfinalizado: true,
          },
        });

        checklists = await prisma.checklists.findMany({
          where: {
            ckusuario: uscodigo,
            ckfinalizado: false,
          },
          include: {
            itensChecklists: true,
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
      });

      return { status: true, message: 'Checklists consultados com sucesso!', checklists, finalizados, pendentes };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar os checklists, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findFinalizados(uscodigo: string) {
    try {
      let checklists;

      await this.prisma.$transaction(async (prisma) => {
        checklists = await prisma.checklists.findMany({
          where: {
            ckusuario: uscodigo,
            ckfinalizado: true,
          },
          include: {
            itensChecklists: true,
          },
        });
      });

      return { status: true, message: 'Checklists consultados com sucesso!', checklists };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível consultar os checklists, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }
}
