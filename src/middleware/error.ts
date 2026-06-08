import type { Response, NextFunction } from "express";
import BusinessError from "../util/businessError.js";
import type { AuthenticatedRequest } from "./auth.js";

export default function errorHandler(
    err: Error,
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
){
    if (err instanceof BusinessError) {
        res.status(err.statusCode).json({ error: err.message, details: err.details });
    } else {
        console.error("Erro inesperado:", req?.user?.email, req?.user?.role, req.originalUrl, err);
        res.status(500).json("Erro interno do servidor: " + err.message);
    }
}