import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.js";
import { admin as adminPlugin } from "better-auth/plugins";
import { accessControl, roles } from "./roles.js";

if(!process.env.FRONTEND_URL){
    console.log("Variável de ambiente FRONTEND_URL não definida");
    throw new Error("Erro de configuração");
}

const defaultAdmin: string = await prisma.user.findFirst({
    where: { email: process.env.DEFAULT_ADMIN || "" }
}).then(user => user?.id || "")

export const auth = betterAuth({
    database: prismaAdapter(prisma,{
        provider: "postgresql"
    }),
    trustedOrigins:[ process.env.FRONTEND_URL ],
    emailAndPassword:{
        enabled: true,
    },
    plugins:[
        adminPlugin({
            ac: accessControl,
            roles,
            defaultRole: "padrao",
            adminUserIds: [ defaultAdmin ]
        })
    ]
});
