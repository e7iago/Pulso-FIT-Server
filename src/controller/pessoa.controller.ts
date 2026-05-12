import prisma from "../lib/prisma.js";
import BusinessError from "../util/businessError.js";

class PessoaController {

    async getPessoas() {
        const pessoas = await prisma.pessoa.findMany();
        return pessoas;
    }

    async criaPessoa(
        userId: string,
        cpf: string,
        nascimento: Date,
        sexo: string) 
        {
        try {
            const pessoa = await prisma.pessoa.create({
                data: {
                    userId: userId,
                    cpf: cpf,
                    nascimento: nascimento,
                    sexo: sexo
                }
            })
            return pessoa;
        } catch (error) {
            console.error("Erro ao criar pessoa:", error);
            throw new BusinessError("Erro ao salvar a pessoa", 500);
        }
    }

}

export default new PessoaController();