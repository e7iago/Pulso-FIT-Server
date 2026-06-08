import { Router, type Response } from "express";

const router = Router();

router.get("/",(_,res: Response) => {
    res.send("Seja bem vindo!");
})

export default router;