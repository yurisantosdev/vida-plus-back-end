/*
  Warnings:

  - You are about to alter the column `vehodometro` on the `veiculos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "veiculos" ALTER COLUMN "vehodometro" SET DATA TYPE INTEGER;
