/*
  Warnings:

  - You are about to drop the `categoriasDespesas` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `dpcategoria` on the `despesas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `vequilometragem` to the `veiculos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoriasDespesasEnum" AS ENUM ('ESTACIONAMENTO', 'MULTA', 'LAVAGEM', 'SEGURO', 'OUTRO');

-- DropForeignKey
ALTER TABLE "categoriasDespesas" DROP CONSTRAINT "categoriasDespesas_ctvusuario_fkey";

-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_dpcategoria_fkey";

-- AlterTable
ALTER TABLE "despesas" DROP COLUMN "dpcategoria",
ADD COLUMN     "dpcategoria" "CategoriasDespesasEnum" NOT NULL;

-- AlterTable
ALTER TABLE "veiculos" ADD COLUMN     "vequilometragem" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "categoriasDespesas";

-- CreateTable
CREATE TABLE "manutencoes" (
    "mtcodigo" TEXT NOT NULL,
    "mtveiculo" TEXT NOT NULL,
    "mtquando" TEXT NOT NULL,
    "mtvalor" DOUBLE PRECISION NOT NULL,
    "mtdescricao" TEXT NOT NULL,
    "mttitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manutencoes_pkey" PRIMARY KEY ("mtcodigo")
);

-- AddForeignKey
ALTER TABLE "manutencoes" ADD CONSTRAINT "manutencoes_mtveiculo_fkey" FOREIGN KEY ("mtveiculo") REFERENCES "veiculos"("vecodigo") ON DELETE RESTRICT ON UPDATE CASCADE;
