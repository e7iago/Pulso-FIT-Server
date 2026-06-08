import { Router, type Response } from "express";
import ExercicioController from "../controller/exercicio.controller.js";
import BusinessError from "../util/businessError.js";
import { auth } from "../lib/auth.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_, res: Response) => {
    const exercicios = await ExercicioController.getExercicios();
    res.status(200).json(exercicios);
});

router.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID do exercício", 400);
    }

    const exercicio = await ExercicioController.getExercicioById(parseInt(id));

    if (!exercicio) {
        throw new BusinessError("Exercício não encontrado", 404);
    }

    res.status(200).json(exercicio);
})

router.post("/", async (req: AuthenticatedRequest, res: Response) => {

    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: req.user.id,
            permissions: { project: ["createExercicio"] }
        }
    })

    if (!hasPermission || hasPermission.success === false) {
        throw new BusinessError("Acesso negado", 403);
    }

    const { exercicios } = req.body;

    if (!Array.isArray(exercicios) || exercicios.length === 0) {
        throw new BusinessError("Enviar uma lista de exercícios", 400);
    }

    exercicios.forEach((exercicio: any) => {
        if (!exercicio || typeof exercicio.nome !== "string" || exercicio.nome.trim() === "" || typeof exercicio.grupoMuscularId !== "number") {
            throw new BusinessError(`Dados inválidos`, 400);
        }
    });

    const exercicio = await ExercicioController.createExercicio(exercicios);

    res.status(201).json(exercicio);
});

router.put("/:id", async (req: AuthenticatedRequest, res: Response) => {
    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: req.user.id,
            permissions: { project: ["createExercicio"] }
        }
    })

    if (!hasPermission || hasPermission.success === false) {
        throw new BusinessError("Acesso negado", 403);
    }

    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID do exercício", 400);
    }

    const { nome, grupoMuscularId, descricao } = req.body;

    const exercicio = await ExercicioController.atualizaExercicio(
        parseInt(id),
        nome,
        grupoMuscularId,
        descricao
    )

    res.status(200).json(exercicio);

})

router.delete("/:id", async (req: AuthenticatedRequest, res: Response) => {
    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: req.user.id,
            permissions: { project: ["createExercicio"] }
        }
    })

    if (!hasPermission || hasPermission.success === false) {
        throw new BusinessError("Acesso negado", 403);
    }

    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID do exercício", 400);
    }

    await ExercicioController.deleteExercicio(id);

    res.status(204).send();
})

export default router;