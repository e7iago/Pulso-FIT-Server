import { type Response, Router } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import EvolucaoController from "../controller/evolucao.controller.js";
import BusinessError from "../util/businessError.js";
import { auth } from "../lib/auth.js";

const router = Router();

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
    const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;

    const evolucao = await EvolucaoController.getEvolucao(
        { headers: req.headers, user: req.user },
        userId);

    res.status(200).json(evolucao);
})

router.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID da avalição", 400);
    }

    const avaliacao = await EvolucaoController.getAvaliacaoById(
        {headers: req.headers, user: req.user},
        parseInt(id)
    )

    res.status(200).json(avaliacao);
})

router.delete("/:id", async (req: AuthenticatedRequest, res: Response) => {
    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID da avaliação", 400);
    }

    await EvolucaoController.deleteAvaliacao(
        { headers: req.headers, user: req.user },
        parseInt(id)
    );

    res.status(204).send();
})

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
    const avaliacao = await EvolucaoController.createAvaliacao(
        { headers: req.headers, user: req.user },
        req.body
    );

    res.status(201).json(avaliacao);
})

export default router;