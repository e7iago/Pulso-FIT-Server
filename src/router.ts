import { type Express } from "express";
import oRotaHome from "./rotas/home.route.js";
import oRotaUser from "./rotas/user.route.js";
import oRotaExercicio from "./rotas/exercicio.route.js";

const router = function ( app: Express ){
    app.use("/", oRotaHome);
    app.use("/api/user", oRotaUser);
    app.use("/api/exercicio", oRotaExercicio);
} 

export default router;