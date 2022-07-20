import { User } from "@prisma/client";
import { Users } from "../../../src/modules/users/core/entity/Users";
import { UserRepository } from "../../../src/modules/users/infra/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    public populateUsers(user: User) {
        this.users.push(user);
    }

    async getUserBy(email: string): Promise<Users> {
        const user = this.users.find((user) => user.email === email);

        return user;
    }

    async getUserById(id: number): Promise<Users> {
        const user = this.users.find((user) => user.id === id);

        return user;
    }
}
