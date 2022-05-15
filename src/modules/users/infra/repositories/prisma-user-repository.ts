import prisma from "../../../../infra/database/prisma";
import { Users } from "../../core/entity/Users";
import { UserRepository } from "./user-repository";



export class PrismaUserRepository implements UserRepository {
    async getUserBy(email: string): Promise<Users> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        return user
    }

}