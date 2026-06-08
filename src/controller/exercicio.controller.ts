import type { ExercicioCreateManyInput } from "../generated/prisma/models.js";
import prisma from "../lib/prisma.js";
import BusinessError from "../util/businessError.js";


class ExercicioController {

    async getExercicios() {
        const exercicios = await prisma.exercicio.findMany({
            include: { grupoMuscular: true }
        });
        return exercicios;
    }

    async getExercicioById(id: number) {
        const exercicio = await prisma.exercicio.findUnique({
            where: { id: id },
            include: { grupoMuscular: true }
        });
        return exercicio;
    }

    async createExercicio(
        exercicios: ExercicioCreateManyInput[]
    ) {

        try {

            return await prisma.exercicio.createManyAndReturn({
                data: exercicios,
                include: {
                    grupoMuscular: true
                }
            })

        } catch (error) {
            console.error("Erro ao criar exercício:", error);
            throw new BusinessError("Erro ao salvar o exercício", 500);
        }
    }

    async deleteExercicio(id: number) {
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

    async atualizaExercicio(id: number, nome: string, grupoMuscularId: number, descricao?: string) {
        try {
            const exercicio = await prisma.exercicio.update({
                where: {
                    id: id
                },
                data: {
                    nome: nome,
                    descricao: descricao || "",
                    grupoMuscularId: grupoMuscularId
                },
                include: {
                    grupoMuscular: true
                }
            });
            return exercicio;
        } catch (error) {
            console.error("Erro ao atualizar exercício:", error);
            throw new BusinessError("Erro ao atualizar o exercício", 500);
        }
    }

    async createGrupoMuscular(nome: string) {
        try {
            const grupoMuscular = await prisma.grupoMuscular.create({
                data: {
                    nome: nome
                }
            });
            return grupoMuscular;
        } catch (error) {
            console.error("Erro ao criar grupo muscular:", error);
            throw new BusinessError("Erro ao criar o grupo muscular", 500);
        }
    }

    async deletaGrupoMuscular(id: number) {
        try {
            await prisma.grupoMuscular.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.error("Erro ao deletar grupo muscular:", error);
            throw new BusinessError("Erro ao excluir o grupo muscular", 500);
        }
    }

    async getGruposMusculares() {
        const gruposMusculares = await prisma.grupoMuscular.findMany();
        return gruposMusculares;
    }

}

export default new ExercicioController();