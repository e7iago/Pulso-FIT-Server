import { Router, type Request, type Response } from "express";
import pessoaController from "../controller/pessoa.controller.js";
import BusinessError from "../util/businessError.js";


const router = Router();

router.get("/", async (_: Request, res: Response) => {
    const pessoas = await pessoaController.getPessoas();
    res.json(pessoas);
});

router.post("/", async (req: Request, res: Response) => {
    const { userId, cpf, nascimento, sexo } = req.body;

    if (!userId || !cpf || !nascimento || !sexo) {
        throw new BusinessError("userId, cpf, nascimento e sexo são obrigatórios", 400);
    }

    const pessoa = await pessoaController.criaPessoa(userId, cpf, new Date(nascimento), sexo);
    res.status(201).json(pessoa);
});

export default router;