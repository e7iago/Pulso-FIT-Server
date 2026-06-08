import { Router, type Response } from "express";
import TreinoController from "../controller/treino.controller.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import BusinessError from "../util/businessError.js";
import { auth } from "../lib/auth.js";

const router = Router();

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
    
    const contexto = { headers: req.headers, user: req.user };

    if(req.query.$count !== undefined){
        const count = await TreinoController.countTreinos(contexto)
        res.status(200).json(count);
        return;
    }

    const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;

    const treinos = await TreinoController.getTreinos(
        contexto,
        userId);

    res.status(200).json(treinos);
})

router.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID do exercício", 400);
    }

    const treino = await TreinoController.getTreinoById(parseInt(id));
    if (!treino) {
        throw new BusinessError("Treino não encontrado", 404);
    }
    res.status(200).json(treino);
})

router.post("/", async (req: AuthenticatedRequest, res: Response) => {

    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: req.user?.id,
            permissions: { project: ["createTreino"] }
        }
    })

    if (!hasPermission.success)
        throw new BusinessError("Acesso negado", 403);

    const { nome, userId, treinoExercicio } = req.body;

    const treino = await TreinoController.criaTreino(nome, userId);
    res.status(201).json(treino);
});

router.put("/:id", async (req: AuthenticatedRequest, res: Response) => {

    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: req.user?.id,
            permissions: { project: ["createTreino"] }
        }
    })

    if (!hasPermission.success)
        throw new BusinessError("Acesso negado", 403);

    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID do treino", 400);
    }

    const { nome, treinoExercicio } = req.body;
    const treino = await TreinoController.atualizaTreino(parseInt(id), nome, treinoExercicio);
    res.status(200).json(treino);
})

router.delete("/:id", async (req: AuthenticatedRequest, res: Response) => {
    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID do treino", 400);
    }

    await TreinoController.deletaTreino(
        { headers: req.headers, user: req.user },
        parseInt(id)
    );

    res.status(204).send();
})

export default router;