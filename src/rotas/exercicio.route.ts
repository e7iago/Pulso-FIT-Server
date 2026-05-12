import { Router, type Request, type Response } from "express";
import ExercicioController from "../controller/exercicio.controller.js";
import BusinessError from "../util/businessError.js";

const router = Router();

router.get("/", async (_,res: Response) => {
    const exercicios = await ExercicioController.getExercicios();
    res.json(exercicios);
})

router.post("/", async (req: Request, res: Response) => {
    const { nome, grupoMuscular } = req.body;

    if (!nome || !grupoMuscular) {
        throw new BusinessError("Nome e grupo muscular são obrigatórios", 400);
    }

    const exercicio = await ExercicioController.criaExercicio(
        nome,
        grupoMuscular
    );

    res.status(201).json(exercicio);
});

export default router;