import { Users } from "../../core/entity/Users";



export interface UserRepository {
    getUserBy(email: string): Promise<Users>
}