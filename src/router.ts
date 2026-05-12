import { type Express } from "express";
import oRotaHome from "./rotas/home.route.js";
import oRotaUser from "./rotas/user.route.js";
import oRotaExercicio from "./rotas/exercicio.route.js";
import oRotaTreino from "./rotas/treino.route.js";
import oRotaEndereco from "./rotas/endereco.route.js";

const router = function ( app: Express ){
    app.use("/", oRotaHome);
    app.use("/api/user", oRotaUser);
    app.use("/api/exercicio", oRotaExercicio);
    app.use("/api/treino", oRotaTreino);
    app.use("/api/endereco", oRotaEndereco);
} 

export default router;