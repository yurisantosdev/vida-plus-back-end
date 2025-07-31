/*
  Warnings:

  - Added the required column `dpusuario` to the `despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "despesas" ADD COLUMN     "dpusuario" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_dpusuario_fkey" FOREIGN KEY ("dpusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;
