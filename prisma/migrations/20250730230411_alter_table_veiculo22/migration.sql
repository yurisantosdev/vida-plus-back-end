/*
  Warnings:

  - Added the required column `abusuario` to the `abastecimentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "abastecimentos" ADD COLUMN     "abusuario" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "abastecimentos" ADD CONSTRAINT "abastecimentos_abusuario_fkey" FOREIGN KEY ("abusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;
