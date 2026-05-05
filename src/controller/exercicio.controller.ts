import prisma from "../lib/prisma.js";

class ExercicioController {

    async getExercicios() {
        const exercicios = prisma.exercicio.findMany();
        return exercicios;
    }

    async criaExercicio( ivNome: string ) {
        prisma.exercicio.create({
            data: {
                nome: ivNome
            }
        });
    }

}

export default new ExercicioController();