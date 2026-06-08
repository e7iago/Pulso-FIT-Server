/*
  Warnings:

  - You are about to drop the `acessos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "acessos" DROP CONSTRAINT "acessos_userId_fkey";

-- DropTable
DROP TABLE "acessos";

-- CreateTable
CREATE TABLE "acesso" (
    "id" SERIAL NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" "TipoAcesso" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "acesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliacao_fisica" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peso" DECIMAL(65,30) NOT NULL,
    "unidadePeso" TEXT NOT NULL,
    "altura" DECIMAL(65,30) NOT NULL,
    "unidadeAltura" TEXT NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "braco" DECIMAL(65,30) NOT NULL,
    "quadril" DECIMAL(65,30) NOT NULL,
    "abdomen" DECIMAL(65,30) NOT NULL,
    "torax" DECIMAL(65,30) NOT NULL,
    "perna" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "avaliacao_fisica_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "acesso" ADD CONSTRAINT "acesso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao_fisica" ADD CONSTRAINT "avaliacao_fisica_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
