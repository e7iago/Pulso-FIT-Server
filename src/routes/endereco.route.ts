import { Router, type Request, type Response } from 'express';
import EnderecoController from '../controller/endereco.controller.js';
import BusinessError from '../util/businessError.js';

const router = Router();

router.get("/", async(_:Request,res: Response) => {
    const enderecos = await EnderecoController.getEnderecos();
    res.json(enderecos);
});

router.post("/", async (req: Request, res: Response) => {
    const { pessoaId, cep, cidade, bairro, rua, numero, padrao } = req.body;

    if (!pessoaId || !cep || !cidade || !bairro || !rua) {
        throw new BusinessError("PessoaId, cep, cidade, bairro e rua são obrigatórios", 400);
    }

    const endereco = await EnderecoController.criaEndereco(
        pessoaId,
        cep,
        cidade,
        bairro,
        rua,
        numero,
        padrao
    );

    res.status(201).json(endereco);
});

export default router;