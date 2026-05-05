import { Router, type Response } from "express";
import UserController from "../controller/user.controller.js";

const router = Router();

router.get("/", async (_,res: Response) => {
    const userCount = await UserController.getUserCount();
    res.json(userCount);
})

export default router;