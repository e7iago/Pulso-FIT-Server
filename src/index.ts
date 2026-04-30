import express from "express";
import cors from "cors";
import router from "./router.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { authenticateUser } from "./middleware/auth.js";

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}))

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use("/api", authenticateUser);
app.use(express.json());

router(app);

export default app;