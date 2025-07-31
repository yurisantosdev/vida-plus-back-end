/*
  Warnings:

  - Changed the type of `mthodometro` on the `manutencoes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "manutencoes" DROP COLUMN "mthodometro",
ADD COLUMN     "mthodometro" INTEGER NOT NULL;
