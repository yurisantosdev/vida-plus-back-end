/*
  Warnings:

  - You are about to alter the column `abhodometro` on the `abastecimentos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "abastecimentos" ALTER COLUMN "abhodometro" SET DATA TYPE INTEGER;
