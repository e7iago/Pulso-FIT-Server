import { Router, type Request, type Response } from "express";
import TreinoController from "../controller/treino.controller.js";

const router = Router();

router.get("/", async (_,res: Response) => {
    const treinos = await TreinoController.getTreinos();
    res.json(treinos);
})

router.post("/", async (req: Request, res: Response) => {
    const { nome, userId, exercicios } = req.body;

    const treino = await TreinoController.criaTreino(nome, userId, exercicios);
    res.status(201).json(treino);
});

export default router;