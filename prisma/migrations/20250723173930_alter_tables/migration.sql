/*
  Warnings:

  - You are about to drop the `itensListaCompras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `listaCompras` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itensListaCompras" DROP CONSTRAINT "itensListaCompras_itlista_fkey";

-- DropForeignKey
ALTER TABLE "listaCompras" DROP CONSTRAINT "listaCompras_lcusuario_fkey";

-- DropTable
DROP TABLE "itensListaCompras";

-- DropTable
DROP TABLE "listaCompras";

-- CreateTable
CREATE TABLE "checklists" (
    "ckcodigo" TEXT NOT NULL,
    "cktitulo" TEXT NOT NULL,
    "ckusuario" TEXT NOT NULL,
    "ckfinalizado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checklists_pkey" PRIMARY KEY ("ckcodigo")
);

-- CreateTable
CREATE TABLE "itensChecklists" (
    "iccodigo" TEXT NOT NULL,
    "ictitulo" TEXT NOT NULL,
    "icdescricao" TEXT NOT NULL,
    "iccheck" BOOLEAN NOT NULL DEFAULT false,
    "icchecklist" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itensChecklists_pkey" PRIMARY KEY ("iccodigo")
);

-- AddForeignKey
ALTER TABLE "checklists" ADD CONSTRAINT "checklists_ckusuario_fkey" FOREIGN KEY ("ckusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itensChecklists" ADD CONSTRAINT "itensChecklists_icchecklist_fkey" FOREIGN KEY ("icchecklist") REFERENCES "checklists"("ckcodigo") ON DELETE RESTRICT ON UPDATE CASCADE;
