import { type Express } from "express";
import oRotaHome from "./rotas/home.route.js"

const router = function ( app: Express ){
    app.use("/", oRotaHome)
}

export default router;