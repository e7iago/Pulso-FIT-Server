import { Router, type Request, type Response } from "express";
import ExercicioController from "../controller/exercicio.controller.js";

const router = Router();

router.get("/", async (_,res: Response) => {
    const exercicios = await ExercicioController.getExercicios();
    res.json(exercicios);
})

router.post("/", async (req: Request, res: Response) => {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
        res.status(400).json({ error: "Nome e descrição são obrigatórios" });
        return;
    }

    const exercicio = await ExercicioController.criaExercicio(
        nome
    );

    res.status(201).json(exercicio);
});

export default router;