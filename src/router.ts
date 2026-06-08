import { type Express } from "express";
import oRotaHome from "./routes/home.route.js";
import oRotaUser from "./routes/user.route.js";
import oRotaExercicio from "./routes/exercicio.route.js";
import oRotaTreino from "./routes/treino.route.js";
import oRotaEndereco from "./routes/endereco.route.js";
import oRotaGrupoMuscular from "./routes/grupoMuscular.route.js";
import oRotaPermissao from "./routes/permissao.route.js";
import oRotaEvolucao from "./routes/evolucao.route.js";

const router = function ( app: Express ){ 
    app.use("/", oRotaHome);
    app.use("/api/usuario", oRotaUser);
    app.use("/api/exercicio", oRotaExercicio);
    app.use("/api/treino", oRotaTreino);
    app.use("/api/endereco", oRotaEndereco);
    app.use("/api/grupo-muscular", oRotaGrupoMuscular);
    app.use("/api/permissao", oRotaPermissao);
    app.use("/api/evolucao", oRotaEvolucao);
} 

export default router;