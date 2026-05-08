import prisma from "../lib/prisma.js";

class ExercicioController {

    async getExercicios() {
        const exercicios = await prisma.exercicio.findMany();
        return exercicios;
    }

    async criaExercicio( nome : string, grupoMuscular : string ) {

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
    }

    async deletaExercicio( id : number ) {
        await prisma.exercicio.delete({
            where: {
                id: id
            }
        })
    }

}

export default new ExercicioController();