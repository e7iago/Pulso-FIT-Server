import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.js";

if(!process.env.FRONTEND_URL){
    console.log("Variável de ambiente FRONTEND_URL não definida");
    throw new Error("Erro de configuração");
}

export const auth = betterAuth({
    database: prismaAdapter(prisma,{
        provider: "postgresql"
    }),
    trustedOrigins:[ process.env.FRONTEND_URL ],
    emailAndPassword:{
        enabled: true,
    }
});
