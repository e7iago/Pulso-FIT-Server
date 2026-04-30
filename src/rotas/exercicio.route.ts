import { Router, type Response } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (_,res: Response) => {
    const exercicios = await prisma.exercicio.findMany();
    res.json(exercicios);
})

export default router;