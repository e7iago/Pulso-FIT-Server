import { Router, type Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
    if( req.user?.role === "admin") {

    } else {

    }

    res.status(200).json({ message: "Contexto route" });
})

export default router;