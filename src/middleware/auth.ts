import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import BusinessError from "../util/businessError.js";

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
      throw new BusinessError("Usuário não autenticado", 401);
    }

    // Adicionar session ao req para uso posterior
    req.user = session.session;
    req.session = session.user;

  } catch (error) {
    throw new BusinessError("Erro na validação", 500);
  }

  next();
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