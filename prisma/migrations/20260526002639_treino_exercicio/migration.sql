/*
  Warnings:

  - A unique constraint covering the columns `[treinoId,exercicioId]` on the table `treino_exercicio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "treino_exercicio_treinoId_exercicioId_key" ON "treino_exercicio"("treinoId", "exercicioId");
