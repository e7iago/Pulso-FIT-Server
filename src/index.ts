import express from "express";
import cors from "cors";
import router from "./router.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { authenticateUser } from "./middleware/auth.js";
import errorHandler from "./middleware/error.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use("/api", authenticateUser);

router(app);

app.use(errorHandler);

export default app;