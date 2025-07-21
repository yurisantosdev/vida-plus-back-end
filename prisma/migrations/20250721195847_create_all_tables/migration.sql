-- CreateEnum
CREATE TYPE "UrgenciasEnum" AS ENUM ('URGENTE', 'NORMAL', 'MEDIA');

-- CreateEnum
CREATE TYPE "TiposContasEnum" AS ENUM ('CORRENTE', 'POUPANCA', 'SALARIO');

-- CreateTable
CREATE TABLE "usuarios" (
    "uscodigo" TEXT NOT NULL,
    "usnome" TEXT NOT NULL,
    "usemail" TEXT NOT NULL,
    "usfoto" TEXT NOT NULL,
    "ussenha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("uscodigo")
);

-- CreateTable
CREATE TABLE "codigosRecuperarSenha" (
    "crscodigo" TEXT NOT NULL,
    "crstoken" INTEGER NOT NULL,
    "crsusuario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "codigosRecuperarSenha_pkey" PRIMARY KEY ("crscodigo")
);

-- CreateTable
CREATE TABLE "contas" (
    "cocodigo" TEXT NOT NULL,
    "coconta" TEXT NOT NULL,
    "cousuario" TEXT NOT NULL,
    "cobanco" TEXT NOT NULL,
    "cotipoconta" "TiposContasEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contas_pkey" PRIMARY KEY ("cocodigo")
);

-- CreateTable
CREATE TABLE "categoriasTransacoes" (
    "ctcodigo" TEXT NOT NULL,
    "ctcategoria" TEXT NOT NULL,
    "ctusuario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoriasTransacoes_pkey" PRIMARY KEY ("ctcodigo")
);

-- CreateTable
CREATE TABLE "transacoes" (
    "tscodigo" TEXT NOT NULL,
    "tstitulo" TEXT NOT NULL,
    "tsdescricao" TEXT NOT NULL,
    "tsconta" TEXT NOT NULL,
    "tsvalor" DOUBLE PRECISION NOT NULL,
    "tsdespesa" BOOLEAN NOT NULL DEFAULT false,
    "tsquando" TEXT NOT NULL,
    "tscategoria" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transacoes_pkey" PRIMARY KEY ("tscodigo")
);

-- CreateTable
CREATE TABLE "veiculos" (
    "vecodigo" TEXT NOT NULL,
    "veplaca" TEXT NOT NULL,
    "veusuario" TEXT NOT NULL,
    "venome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("vecodigo")
);

-- CreateTable
CREATE TABLE "abastecimentos" (
    "abcodigo" TEXT NOT NULL,
    "abvalortotal" DOUBLE PRECISION NOT NULL,
    "ablitros" DOUBLE PRECISION NOT NULL,
    "abvalorlitro" DOUBLE PRECISION NOT NULL,
    "abveiculo" TEXT NOT NULL,
    "abquando" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "abastecimentos_pkey" PRIMARY KEY ("abcodigo")
);

-- CreateTable
CREATE TABLE "categoriasDespesas" (
    "cdvcodigo" TEXT NOT NULL,
    "ctvcaetgoria" TEXT NOT NULL,
    "ctvusuario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoriasDespesas_pkey" PRIMARY KEY ("cdvcodigo")
);

-- CreateTable
CREATE TABLE "despesas" (
    "dpcodigo" TEXT NOT NULL,
    "dpvalor" DOUBLE PRECISION NOT NULL,
    "dpdescricao" TEXT NOT NULL,
    "dpcategoria" TEXT NOT NULL,
    "dpveiculo" TEXT NOT NULL,
    "dpquando" TEXT NOT NULL,
    "dpkm" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "despesas_pkey" PRIMARY KEY ("dpcodigo")
);

-- CreateTable
CREATE TABLE "listaCompras" (
    "lccodigo" TEXT NOT NULL,
    "lctitulo" TEXT NOT NULL,
    "lcusuario" TEXT NOT NULL,
    "lcfinalizada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listaCompras_pkey" PRIMARY KEY ("lccodigo")
);

-- CreateTable
CREATE TABLE "itensListaCompras" (
    "itcodigo" TEXT NOT NULL,
    "ittitulo" TEXT NOT NULL,
    "itlista" TEXT NOT NULL,
    "itquantidade" INTEGER NOT NULL,
    "itcomprado" BOOLEAN NOT NULL DEFAULT false,
    "itvalor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itensListaCompras_pkey" PRIMARY KEY ("itcodigo")
);

-- CreateTable
CREATE TABLE "tarefas" (
    "tfcodigo" TEXT NOT NULL,
    "tftitulo" TEXT NOT NULL,
    "tfdescricao" TEXT NOT NULL,
    "tffeito" BOOLEAN NOT NULL DEFAULT false,
    "tfusuario" TEXT NOT NULL,
    "tfurgencia" "UrgenciasEnum" NOT NULL,
    "tfdataentrega" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("tfcodigo")
);

-- CreateTable
CREATE TABLE "subTarefas" (
    "stcodigo" TEXT NOT NULL,
    "sttarefa" TEXT NOT NULL,
    "sttitulo" TEXT NOT NULL,
    "stdescricao" TEXT NOT NULL,
    "sturgencia" "UrgenciasEnum" NOT NULL,
    "stdateentrega" TEXT NOT NULL,
    "stfeito" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subTarefas_pkey" PRIMARY KEY ("stcodigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_usemail_key" ON "usuarios"("usemail");

-- CreateIndex
CREATE UNIQUE INDEX "veiculos_veplaca_key" ON "veiculos"("veplaca");

-- AddForeignKey
ALTER TABLE "codigosRecuperarSenha" ADD CONSTRAINT "codigosRecuperarSenha_crsusuario_fkey" FOREIGN KEY ("crsusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_cousuario_fkey" FOREIGN KEY ("cousuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoriasTransacoes" ADD CONSTRAINT "categoriasTransacoes_ctusuario_fkey" FOREIGN KEY ("ctusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_tsconta_fkey" FOREIGN KEY ("tsconta") REFERENCES "contas"("cocodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_tscategoria_fkey" FOREIGN KEY ("tscategoria") REFERENCES "categoriasTransacoes"("ctcodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiculos" ADD CONSTRAINT "veiculos_veusuario_fkey" FOREIGN KEY ("veusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abastecimentos" ADD CONSTRAINT "abastecimentos_abveiculo_fkey" FOREIGN KEY ("abveiculo") REFERENCES "veiculos"("vecodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoriasDespesas" ADD CONSTRAINT "categoriasDespesas_ctvusuario_fkey" FOREIGN KEY ("ctvusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_dpveiculo_fkey" FOREIGN KEY ("dpveiculo") REFERENCES "veiculos"("vecodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_dpcategoria_fkey" FOREIGN KEY ("dpcategoria") REFERENCES "categoriasDespesas"("cdvcodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listaCompras" ADD CONSTRAINT "listaCompras_lcusuario_fkey" FOREIGN KEY ("lcusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itensListaCompras" ADD CONSTRAINT "itensListaCompras_itlista_fkey" FOREIGN KEY ("itlista") REFERENCES "listaCompras"("lccodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_tfusuario_fkey" FOREIGN KEY ("tfusuario") REFERENCES "usuarios"("uscodigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subTarefas" ADD CONSTRAINT "subTarefas_sttarefa_fkey" FOREIGN KEY ("sttarefa") REFERENCES "tarefas"("tfcodigo") ON DELETE RESTRICT ON UPDATE CASCADE;
