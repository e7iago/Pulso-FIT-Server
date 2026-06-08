import { Router, type Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import UserController from "../controller/user.controller.js";

const router = Router();

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
    const { projeto } = req.query;

    const hasPermission = await UserController.userHasPermission(req.user.id, projeto);
    res.status(200).json(hasPermission);
})

router.get("/roles", async (req: AuthenticatedRequest, res: Response) => {
    const roles = await UserController.getRoles();
    res.status(200).json(roles);
})

export default router;