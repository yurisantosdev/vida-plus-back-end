/*
  Warnings:

  - You are about to drop the `abastecimentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoriasTransacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `checklists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `codigosRecuperarSenha` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `despesas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itensChecklists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `manutencoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subTarefas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tarefas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `veiculos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "abastecimentos" DROP CONSTRAINT "abastecimentos_abusuario_fkey";

-- DropForeignKey
ALTER TABLE "abastecimentos" DROP CONSTRAINT "abastecimentos_abveiculo_fkey";

-- DropForeignKey
ALTER TABLE "categoriasTransacoes" DROP CONSTRAINT "categoriasTransacoes_ctusuario_fkey";

-- DropForeignKey
ALTER TABLE "checklists" DROP CONSTRAINT "checklists_ckusuario_fkey";

-- DropForeignKey
ALTER TABLE "codigosRecuperarSenha" DROP CONSTRAINT "codigosRecuperarSenha_crsusuario_fkey";

-- DropForeignKey
ALTER TABLE "contas" DROP CONSTRAINT "contas_cousuario_fkey";

-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_dpusuario_fkey";

-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_dpveiculo_fkey";

-- DropForeignKey
ALTER TABLE "itensChecklists" DROP CONSTRAINT "itensChecklists_icchecklist_fkey";

-- DropForeignKey
ALTER TABLE "manutencoes" DROP CONSTRAINT "manutencoes_mtusuario_fkey";

-- DropForeignKey
ALTER TABLE "manutencoes" DROP CONSTRAINT "manutencoes_mtveiculo_fkey";

-- DropForeignKey
ALTER TABLE "subTarefas" DROP CONSTRAINT "subTarefas_sttarefa_fkey";

-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_tfusuario_fkey";

-- DropForeignKey
ALTER TABLE "transacoes" DROP CONSTRAINT "transacoes_tscategoria_fkey";

-- DropForeignKey
ALTER TABLE "transacoes" DROP CONSTRAINT "transacoes_tsconta_fkey";

-- DropForeignKey
ALTER TABLE "veiculos" DROP CONSTRAINT "veiculos_veusuario_fkey";

-- DropTable
DROP TABLE "abastecimentos";

-- DropTable
DROP TABLE "categoriasTransacoes";

-- DropTable
DROP TABLE "checklists";

-- DropTable
DROP TABLE "codigosRecuperarSenha";

-- DropTable
DROP TABLE "contas";

-- DropTable
DROP TABLE "despesas";

-- DropTable
DROP TABLE "itensChecklists";

-- DropTable
DROP TABLE "manutencoes";

-- DropTable
DROP TABLE "subTarefas";

-- DropTable
DROP TABLE "tarefas";

-- DropTable
DROP TABLE "transacoes";

-- DropTable
DROP TABLE "usuarios";

-- DropTable
DROP TABLE "veiculos";

-- DropEnum
DROP TYPE "CategoriasDespesasEnum";

-- DropEnum
DROP TYPE "TiposContasEnum";

-- DropEnum
DROP TYPE "UrgenciasEnum";
