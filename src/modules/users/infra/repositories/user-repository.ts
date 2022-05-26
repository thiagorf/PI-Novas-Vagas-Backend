import { Users } from "../../core/entity/Users";

export interface UserRepository {
    getUserBy(email: string): Promise<Users>;
    getUserById(id: number): Promise<Users>;
}
