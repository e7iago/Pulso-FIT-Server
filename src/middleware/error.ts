import type { Request, Response, NextFunction } from "express";
import BusinessError from "../util/businessError.js";

export default function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
){
    if (err instanceof BusinessError) {
        res.status(err.statusCode).json({ error: err.message, details: err.details });
    } else {
        res.status(500).json("Erro interno do servidor: " + err.message);
    }
}