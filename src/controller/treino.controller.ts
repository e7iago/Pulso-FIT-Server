import type { TreinoUpdateInput, TreinoUpdateManyMutationInput } from "../generated/prisma/models.js";
import { auth } from "../lib/auth.js";
import prisma from "../lib/prisma.js";
import BusinessError from "../util/businessError.js";

interface TreinoExercicioData {
    exercicioId: number;
    peso: number;
    unidadePeso: string;
    series: number;
    repeticoes: number;
    delete: boolean;
}

type Context = {
    headers: any;
    user: any;
}
class TreinoController {

    async countTreinos(contexto: Context){
        try {
            const count = await prisma.treino.count({
                where: { userId: contexto.user.id }
            })
            return count
        } catch (error) {
            console.error("Erro ao buscar treinos no banco de dados:", error);
            throw new BusinessError("Erro ao buscar treinos no banco de dados.", 500);
        }
    }

    async getTreinos(contexto: Context, userId?: string) {
        
        let targetUserId: string = contexto.user.id;

        if (userId && userId !== contexto.user.id) {
            const hasPermission = await auth.api.userHasPermission({
                body: {
                    userId: contexto.user.id,
                    permissions: { project: ["createTreino"] }
                }
            })

            if (!hasPermission?.success) {
                throw new BusinessError("Acesso negado", 403);
            }

            targetUserId = userId;
        }

        try {
            const treinos = await prisma.treino.findMany({
                where: { userId: targetUserId },
                include: {
                    user: {
                        select: {
                            email: true,
                            id: true,
                            name: true
                        }
                    },
                    treinoExercicio: {
                        include: {
                            exercicio: {
                                include: { grupoMuscular: true }
                            }
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

    async getTreinoById(id: number) {
        try {
            const treino = await prisma.treino.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            email: true,
                            id: true,
                            name: true
                        }
                    },
                    treinoExercicio: {
                        include: {
                            exercicio: {
                                include: { grupoMuscular: true }
                            }
                        }
                    }
                }
            });
            return treino;
        } catch (error) {
            console.error("Erro ao buscar treino:", error);
            throw new BusinessError("Não foi possível buscar o treino.", 500);
        }
    }

    async criaTreino(
        nome: string,
        userId: string) {

        try {

            const treino = await prisma.treino.create({
                data: {
                    nome: nome,
                    userId: userId
                }
            });
            return treino;
        } catch (error) {
            console.error("Erro ao criar treino:", error);
            throw new BusinessError("Erro ao salvar o treino no banco de dados.", 500);
        }
    }

    async atualizaTreino(
        id: number,
        nome?: string,
        exercicios?: TreinoExercicioData[]
    ) {
        try {

            const data: TreinoUpdateInput = {};

            if (nome) {
                data.nome = nome;
            }

            const toDelete = exercicios?.filter(e => e.delete) ?? [];
            const toUpsert = exercicios?.filter(e => !e.delete) ?? [];

            if (exercicios && toUpsert.length > 0) {
                data.treinoExercicio = {
                    upsert: toUpsert.map((exercicio) => {
                        const peso = Number(exercicio.peso) | 0;
                        const series = Number(exercicio.series) | 0;
                        const repeticoes = Number(exercicio.repeticoes) | 0;

                        if (!Number.isInteger(series) || !Number.isInteger(repeticoes) || !Number.isInteger(peso)) {
                            throw new BusinessError("peso, series e repeticoes devem ser inteiros", 400);
                        }

                        return {
                            where: {
                                treinoId_exercicioId: {
                                    exercicioId: exercicio.exercicioId,
                                    treinoId: id
                                }
                            },
                            create: {
                                exercicioId: exercicio.exercicioId,
                                peso,
                                unidadePeso: exercicio.unidadePeso,
                                series,
                                repeticoes
                            },
                            update: {
                                peso,
                                unidadePeso: exercicio.unidadePeso,
                                series,
                                repeticoes
                            }
                        };
                    })
                };
            }

            const treino = await prisma.$transaction(async (tx) => {
                if (toDelete.length > 0) {
                    await tx.treinoExercicio.deleteMany({
                        where: {
                            treinoId: id,
                            exercicioId: { in: toDelete.map(e => e.exercicioId) }
                        }
                    });
                }

                return tx.treino.update({
                    where: { id },
                    data,
                    include: { treinoExercicio: true }
                });
            });

            return treino;

        } catch (error) {
            console.error("Erro ao atualizar treino:", error);
            throw new BusinessError("Erro ao atualizar o treino no banco de dados.", 500);
        }
    }
    async deletaTreino(contexto: Context, id: number) {

        const hasPermission = await auth.api.userHasPermission({
            body: {
                userId: contexto.user.id,
                permissions: { project: ["createTreino"] }
            }
        })

        if (!hasPermission?.success) {
            throw new BusinessError("Acesso negado", 403);
        }

        try {
            await prisma.treino.delete({ where: { id } })
        } catch (error) {
            console.error("Erro ao deletar treino:", error);
            throw new BusinessError("Não foi possível deletar o treino.", 500);
        }
    }

}

export default new TreinoController();