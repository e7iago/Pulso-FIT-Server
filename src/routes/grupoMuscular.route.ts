import { Router } from "express";
import ExercicioController from "../controller/exercicio.controller.js";
import BusinessError from "../util/businessError.js";

const router = Router();

router.get("/", async (_, res) => {
    const gruposMusculares = await ExercicioController.getGruposMusculares();
    res.status(200).json(gruposMusculares);
});

router.post("/", async (req, res) => {
    const { nome } = req.body;

    const grupoMuscular = await ExercicioController.createGrupoMuscular(nome);

    res.status(201).json(grupoMuscular);
});

router.delete("/:id", async (req, res) => {
    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID do grupo muscular", 400);
    }
    try {
        await ExercicioController.deletaGrupoMuscular(id)
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar grupo muscular:", error);
        throw new BusinessError("Erro ao excluir o grupo muscular", 500);
    }
});

export default router;