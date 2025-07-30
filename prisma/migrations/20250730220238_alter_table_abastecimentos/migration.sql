/*
  Warnings:

  - Added the required column `abhodometro` to the `abastecimentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "abastecimentos" ADD COLUMN     "abhodometro" DOUBLE PRECISION NOT NULL;
