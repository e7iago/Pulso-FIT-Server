import express from "express";
import cors from "cors";
import router from "./router.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app = express();

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());
app.use(cors({origin: '*'}))



router(app);

export default app;