import { type Express } from "express";
import oRotaHome from "./rotas/home.route.js";
import oRotaUser from "./rotas/user.route.js";

const router = function ( app: Express ){
    app.use("/", oRotaHome);
    app.use("/user", oRotaUser);
}

export default router;