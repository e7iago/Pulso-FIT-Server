/*
  Warnings:

  - You are about to drop the `Endereco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pessoa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_userId_fkey";

-- AlterTable
ALTER TABLE "exercicio" ADD COLUMN     "descricao" TEXT;

-- DropTable
DROP TABLE "Endereco";

-- DropTable
DROP TABLE "Pessoa";

-- CreateTable
CREATE TABLE "pessoa" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id" TEXT NOT NULL,
    "padrao" BOOLEAN NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "cep" INTEGER NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
