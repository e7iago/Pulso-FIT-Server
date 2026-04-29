import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth.js";

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.
    if (!session) {
      return res.status(401).json({ error: 'Não autorizado' });
    }
    req.user = session.user; // Opcional: anexa o usuário à requisição
    next();
  } catch (error) {
    res.status(500).json({ error: 'Erro na validação' });
  }
};