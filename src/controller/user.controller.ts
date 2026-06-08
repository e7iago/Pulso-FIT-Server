import { auth } from "../lib/auth.js";
import BusinessError from "../util/businessError.js";
import { statement, roles, type Role } from "../lib/roles.js";
import prisma from "../lib/prisma.js";

class UserController {

    async getUsers(headers: any, search?: string | undefined) {
        const users = await auth.api.listUsers({
            query: {
                limit: 100, 
                filterField: "name",
                filterValue: search,
                filterOperator: "contains"
            },
            headers: headers

        });
        return users;
    }

    async getUserById(headers: any, id: string) {
        const user = await auth.api.getUser({
            query: { id },
            headers: headers
        });
        return user;
    }

    async userHasPermission(userId: string, projeto: any) {

        if (!statement.project.includes(projeto as any) || !projeto) {
            throw new BusinessError("Permissão não cadastrada", 400)
        }

        const hasPermission = await auth.api.userHasPermission({
            body: {
                userId: userId,
                permissions: { "project": [projeto as any] }
            }
        })

        if (!hasPermission) {
            throw new BusinessError("Erro na validação", 400)
        }

        return hasPermission;
    }

    async getRoles(): Promise<Role[]> {
        return Object.keys(roles) as Role[];
    }

    async setUserRole(headers: any, userId: string, role: Role) {
        const user = await auth.api.setRole({
            headers,
            body: {
                userId: userId,
                role: role
            },
            asResponse: true
        })
        return user;
    }
}

export default new UserController();

