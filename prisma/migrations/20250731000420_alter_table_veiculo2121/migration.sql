/*
  Warnings:

  - Added the required column `mtusuario` to the `manutencoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "manutencoes" ADD COLUMN     "mtusuario" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "manutencoes" ADD CONSTRAINT "manutencoes_mtusuario_fkey" FOREIGN KEY ("mtusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;
