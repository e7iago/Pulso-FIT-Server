import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const statement = {
    project: [ "readUsuario", "usuario", "readExercicio", "createExercicio", "readTreinos", "createTreino", "createAvaliacao" ],
    ...defaultStatements
} as const;

export const accessControl = createAccessControl(statement);

const padrao = accessControl.newRole({
    project: [ "readExercicio" ]
})

const professor = accessControl.newRole({
    project: [ ...padrao.statements.project, "createExercicio", "readTreinos", "createTreino", "createAvaliacao", "readUsuario" ],
    user: [ "list" ]
})

const admin = accessControl.newRole({
    project: statement.project,
    ...adminAc.statements
})

export const roles = {
    admin,
    professor,
    padrao
}

export type Role = keyof typeof roles;