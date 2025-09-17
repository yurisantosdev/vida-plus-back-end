/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { TransacoesType } from 'src/types/TransacoesType';

@Injectable()
export class TransacoesService {
  constructor(readonly prisma: PrismaService) { }

  async create(transacao: TransacoesType) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        // Criar a transação
        await prisma.transacoes.create({
          data: {
            ...transacao,
            tscodigo: randomUUID(),
            tsquando: new Date(transacao.tsquando),
            tsdataInicio: transacao.tsdataInicio ? new Date(transacao.tsdataInicio) : null,
            tsdataFim: transacao.tsdataFim ? new Date(transacao.tsdataFim) : null,
          },
        });

        // Atualizar o saldo da conta
        const conta = await prisma.contas.findUnique({
          where: { cocodigo: transacao.tsconta },
        });

        if (conta) {
          let novoSaldo = conta.ctsaldo;
          if (transacao.tstipo === 'RECEITA') {
            novoSaldo += transacao.tsvalor;
          } else if (transacao.tstipo === 'DESPESA') {
            novoSaldo -= transacao.tsvalor;
          }

          await prisma.contas.update({
            where: { ctcodigo: transacao.tsconta },
            data: { ctsaldo: novoSaldo },
          });
        }
      });

      return { status: true, message: 'Transação cadastrada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível criar a transação, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async update(transacao: TransacoesType) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        // Buscar transação atual para calcular diferença no saldo
        const transacaoAtual = await prisma.transacoes.findUnique({
          where: { tscodigo: transacao.tscodigo },
        });

        if (transacaoAtual) {
          // Reverter saldo da transação atual
          const conta = await prisma.contas.findUnique({
            where: { ctcodigo: transacaoAtual.tsconta },
          });

          if (conta) {
            let saldoRevertido = conta.ctsaldo;
            if (transacaoAtual.tstipo === 'RECEITA') {
              saldoRevertido -= transacaoAtual.tsvalor;
            } else if (transacaoAtual.tstipo === 'DESPESA') {
              saldoRevertido += transacaoAtual.tsvalor;
            }

            // Aplicar nova transação
            if (transacao.tstipo === 'RECEITA') {
              saldoRevertido += transacao.tsvalor;
            } else if (transacao.tstipo === 'DESPESA') {
              saldoRevertido -= transacao.tsvalor;
            }

            await prisma.contas.update({
              where: { ctcodigo: transacao.tsconta },
              data: { ctsaldo: saldoRevertido },
            });
          }
        }

        // Atualizar transação
        await prisma.transacoes.update({
          where: {
            tscodigo: transacao.tscodigo,
          },
          data: {
            ...transacao,
            tsquando: new Date(transacao.tsquando),
            tsdataInicio: transacao.tsdataInicio ? new Date(transacao.tsdataInicio) : null,
            tsdataFim: transacao.tsdataFim ? new Date(transacao.tsdataFim) : null,
          },
        });
      });

      return { status: true, message: 'Transação atualizada com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível atualizar a transação, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(usuarioId: string, filters?: any) {
    try {
      const where: any = {
        tsusuario: usuarioId,
      };

      if (filters?.conta) {
        where.tsconta = filters.conta;
      }

      if (filters?.tipo) {
        where.tstipo = filters.tipo;
      }

      if (filters?.dataInicio && filters?.dataFim) {
        where.tsquando = {
          gte: new Date(filters.dataInicio),
          lte: new Date(filters.dataFim),
        };
      }

      const transacoes = await this.prisma.transacoes.findMany({
        where,
        include: {
          conta: true,
          categoria: true,
          subcategoria: true,
        },
        orderBy: {
          tsquando: 'desc',
        },
      });

      return { status: true, data: transacoes };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível buscar as transações, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(codigo: string) {
    try {
      const transacao = await this.prisma.transacoes.findUnique({
        where: {
          tscodigo: codigo,
        },
        include: {
          conta: true,
          categoria: true,
          subcategoria: true,
          anexos: true,
        },
      });

      return { status: true, data: transacao };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível buscar a transação, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }

  async delete(codigo: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        const transacao = await prisma.transacoes.findUnique({
          where: { tscodigo: codigo },
        });

        if (transacao) {
          // Reverter saldo da conta
          const conta = await prisma.contas.findUnique({
            where: { ctcodigo: transacao.tsconta },
          });

          if (conta) {
            let novoSaldo = conta.ctsaldo;
            if (transacao.tstipo === 'RECEITA') {
              novoSaldo -= transacao.tsvalor;
            } else if (transacao.tstipo === 'DESPESA') {
              novoSaldo += transacao.tsvalor;
            }

            await prisma.contas.update({
              where: { ctcodigo: transacao.tsconta },
              data: { ctsaldo: novoSaldo },
            });
          }
        }

        await prisma.transacoes.delete({
          where: { tscodigo: codigo },
        });
      });

      return { status: true, message: 'Transação excluída com sucesso!' };
    } catch (error) {
      const errorMessage =
        error instanceof HttpException
          ? error.getResponse()
          : 'Não foi possível excluir a transação, por favor tente novamente!';

      throw new HttpException({ status: false, error: errorMessage }, HttpStatus.FORBIDDEN);
    }
  }
} 