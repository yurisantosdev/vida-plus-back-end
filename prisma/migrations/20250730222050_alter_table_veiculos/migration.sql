/*
  Warnings:

  - You are about to drop the column `vequilometragem` on the `veiculos` table. All the data in the column will be lost.
  - Added the required column `vehodometro` to the `veiculos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "veiculos" DROP COLUMN "vequilometragem",
ADD COLUMN     "vehodometro" DOUBLE PRECISION NOT NULL;
