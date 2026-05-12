import prisma from "../lib/prisma.js";
import BusinessError from "../util/businessError.js";

class EnderecoController {
    
    async getEnderecos() {
        const enderecos = await prisma.endereco.findMany();
        return enderecos;
    }

    async criaEndereco(
        pessoaId: number,
        cep: number,
        cidade: string,
        bairro: string,
        rua: string,
        numero: string | null,
        padrao: boolean = false
        
    ) {
        try {
            const endereco = await prisma.endereco.create({
                data: {
                    pessoaId: pessoaId,
                    rua: rua,
                    numero: numero,
                    bairro: bairro,
                    cidade: cidade,
                    cep: cep,
                    padrao: padrao
                }
            });
            return endereco;
        } catch (error) {
            console.error("Erro ao criar endereço:", error);
            throw new BusinessError("Erro ao salvar o endereço", 500);
        }
    }
}

export default new EnderecoController();