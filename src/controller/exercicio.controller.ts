import prisma from "../lib/prisma.js";
import BusinessError from "../util/businessError.js";

class ExercicioController {

    async getExercicios() {
        const exercicios = await prisma.exercicio.findMany();
        return exercicios;
    }

    async criaExercicio(nome: string, grupoMuscular: string) {

        try {
            await prisma.exercicio.create({
                data: {
                    nome: nome,
                    grupoMuscular: {
                        connectOrCreate: {
                            where: { nome: grupoMuscular },
                            create: { nome: grupoMuscular }
                        }
                    }
                },
                include: {
                    grupoMuscular: true
                }
            })

        } catch (error) {
            console.error("Erro ao criar exercício:", error);
            throw new BusinessError("Erro ao salvar o exercício", 500);
        }
    }

    async deletaExercicio(id: number) {
        try {
        await prisma.exercicio.delete({
            where: {
                id: id
            }
        })
        } catch (error) {
            console.error("Erro ao deletar exercício:", error);
            throw new BusinessError("Erro ao excluir o exercício", 500);
        }
    }

}

export default new ExercicioController();