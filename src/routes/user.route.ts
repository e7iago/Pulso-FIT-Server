import { Router, type Response } from "express";
import UserController from "../controller/user.controller.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import { auth } from "../lib/auth.js";
import BusinessError from "../util/businessError.js";

const router = Router();

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: req.user.id,
            permissions: { "project": ["readUsuario"] }
        }
    })

    if (!hasPermission || hasPermission.success === false) {
        throw new BusinessError("Acesso negado", 403);
    }

    const { search } = req.query;

    const users = await UserController.getUsers(req.headers, search ? String(search) : undefined);
    res.json(users);
})

router.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: req.user.id,
            permissions: { "project": ["usuario"] }
        }
    })

    if (!hasPermission || hasPermission.success === false) {    
        throw new BusinessError("Acesso negado", 403);
    }
    
    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    if (!id) {
        throw new BusinessError("Informar o ID do usuário", 400);
    }

    const user = await UserController.getUserById(req.headers, id);
    res.status(200).json(user);
})

router.put("/:id/role", async (req: AuthenticatedRequest, res: Response) => {
    const hasPermission = await auth.api.userHasPermission({
        body: {
            userId: req.user.id,
            permissions: { "project": ["usuario"] }
        }
    })

    if (!hasPermission || hasPermission.success === false) {    
        throw new BusinessError("Acesso negado", 403);
    }
    
    const { id } = Array.isArray(req.params) ? req.params[0] : req.params;
    const { role } = req.body;

    if (!id) {
        throw new BusinessError("Informar o ID do usuário", 400);
    }

    const response = await UserController.setUserRole(req.headers, id, role);
    res.status(200).json(response);

})

export default router;