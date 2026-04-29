import { Router, type Request, type Response } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (_,res: Response) => {

    const userCount = await prisma.user.count();
    res.json(
        userCount == 0
        ? "No users have been added yet."
        : "Some users have been added to the database.", 
    );
})

router.post("/", async (req: Request, res: Response ) => {

    // const user = await prisma.user.create({
    //     data: {
    //         : req.body.userName,
    //         userDescription: req.body.userDescription
    //     }
    // })

    // res.status(201).send({user});

})

export default router;