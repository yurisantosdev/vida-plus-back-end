/*
  Warnings:

  - You are about to drop the column `dpkm` on the `despesas` table. All the data in the column will be lost.
  - Added the required column `dphodometro` to the `despesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mthodometro` to the `manutencoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "despesas" DROP COLUMN "dpkm",
ADD COLUMN     "dphodometro" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "manutencoes" ADD COLUMN     "mthodometro" TEXT NOT NULL;
