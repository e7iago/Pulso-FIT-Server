import prisma from "../lib/prisma.js";

class UserController {

    async getUserCount() {
        const userCount = await prisma.user.count();
        return userCount == 0
            ? "No users have been added yet."
            : "Some users have been added to the database.";
    }
}

export default new UserController();

