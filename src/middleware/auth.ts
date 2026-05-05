import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";

export interface AuthenticatedRequest extends Request {
  user?: any;
  session?: any;
};

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    // Adicionar session ao req para uso posterior
    req.user = session.session;
    req.session = session.user;

    next();
  } catch (error) {
    res.status(500).json({ error: 'Erro na validação' });
  }
};

export const authenticateOptional = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session) {
      req.user = session.session;
      req.session = session.user;
    }

    next();
  } catch (error) {
    next();
  }
};