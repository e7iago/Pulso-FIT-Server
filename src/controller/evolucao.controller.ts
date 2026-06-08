import prisma from "../lib/prisma.js";
import { auth } from "../lib/auth.js";
import BusinessError from "../util/businessError.js";
import type { AvaliacaoFisica } from "../generated/prisma/browser.js";

type Context = {
    headers: any;
    user: any;
}

class EvolucaoController {

    async getEvolucao(contexto: Context, userId?: string) {

        let targetUserId: string = contexto.user.id;

        if (userId && userId !== contexto.user.id) {
            const hasPermission = await auth.api.userHasPermission({
                body: {
                    userId: contexto.user.id,
                    permissions: { project: ["createAvaliacao"] }
                }
            })

            if (!hasPermission?.success) {
                throw new BusinessError("Acesso negado", 403);
            }

            targetUserId = userId;
        }

        try {
            const evolucao = await prisma.avaliacaoFisica.findMany({
                where: { userId: targetUserId },
                include: { user: true }
            })
            return evolucao;
        } catch (error) {
            console.error("Erro ao buscar evolução:", error);
            throw new BusinessError("Não foi possível buscar a evolução.", 500);
        }
    }

    async getAvaliacaoById(contexto: Context, id: number) {

        try {
            const evolucao = await prisma.avaliacaoFisica.findUniqueOrThrow({
                where: { id },
                include: { user: true }
            })

            if (evolucao.userId !== contexto.user.id) {
                const hasPermission = await auth.api.userHasPermission({
                    body: {
                        userId: contexto.user.id,
                        permissions: { project: ["createAvaliacao"] }
                    }
                })

                if (!hasPermission?.success) {
                    throw new BusinessError("Acesso negado", 403);
                }
            }

            return evolucao;
        } catch (error) {
            console.error("Erro ao buscar evolução:", error);
            throw new BusinessError("Não foi possível buscar a evolução.", 500);
        }

    }

    async createAvaliacao(contexto: Context, avaliacao: AvaliacaoFisica) {

        const hasPermission = await auth.api.userHasPermission({
            body: {
                userId: contexto.user.id,
                permissions: { project: ["createAvaliacao"] }
            }
        })

        if (!hasPermission?.success) {
            throw new BusinessError("Acesso negado", 403);
        }

        try {
            const avaliacaoResponse = await prisma.avaliacaoFisica.create({
                data: {
                    userId: avaliacao.userId,
                    peso: avaliacao.peso,
                    unidadePeso: avaliacao.unidadePeso,
                    altura: avaliacao.altura,
                    unidadeAltura: avaliacao.unidadeAltura,
                    unidadeMedida: avaliacao.unidadeMedida,
                    braco: avaliacao.braco,
                    quadril: avaliacao.quadril,
                    abdomen: avaliacao.abdomen,
                    torax: avaliacao.torax,
                    perna: avaliacao.perna,
                }
            })

            return avaliacaoResponse;
        } catch (error) {
            console.error("Erro ao criar avaliação:", error);
            throw new BusinessError("Não foi possível criar a avaliação.", 500);
        }

    }

    async deleteAvaliacao(contexto: Context, id: number) {

        const hasPermission = await auth.api.userHasPermission({
            body: {
                userId: contexto.user.id,
                permissions: { project: ["createAvaliacao"] }
            }
        })

        if (!hasPermission?.success) {
            throw new BusinessError("Acesso negado", 403);
        }

        try {
            await prisma.avaliacaoFisica.delete({ where: { id } })
        } catch (error) {
            console.error("Erro ao deletar avaliação:", error);
            throw new BusinessError("Não foi possível deletar a avaliação.", 500);
        }
    }

}

export default new EvolucaoController();