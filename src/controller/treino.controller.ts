import prisma from "../lib/prisma.js";
import BusinessError from "../util/businessError.js";

export interface TreinoExercicioData {
    exercicioId: number;
    peso: number;
    unidadePeso: string;
    series: number;
    repeticoes: number;
}

class TreinoController {

    async getTreinos(userId?: string) {
        try {
            const treinos = await prisma.treino.findMany({
                where: userId ? { userId } : {},
                include: {
                    treinoExercicio: {
                        include: {
                            exercicio: true
                        }
                    }
                }
            });
            return treinos;
        } catch (error) {
            console.error("Erro ao buscar treinos:", error);
            throw new BusinessError("Não foi possível buscar os treinos.", 500);
        }
    }

    async criaTreino(
        nome: string,
        userId: string,
        exercicios: TreinoExercicioData[]) {

        try {
            const treino = await prisma.treino.create({
                data: {
                    nome: nome,
                    userId: userId,
                    treinoExercicio: {
                        create: exercicios.map(exercicio => ({
                            exercicioId: exercicio.exercicioId,
                            peso: exercicio.peso,
                            unidadePeso: exercicio.unidadePeso,
                            series: exercicio.series,
                            repeticoes: exercicio.repeticoes
                        }))
                    }
                }
            });
            return treino;
        } catch (error) {
            console.error("Erro ao criar treino:", error);
            throw new BusinessError("Erro ao salvar o treino no banco de dados.", 500);
        }
    }

}

export default new TreinoController();