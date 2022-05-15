import { compare } from "bcrypt";
import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";
import { UserRepository } from "../../../../infra/repositories/user-repository";
import { EnterpriseAuthDTO } from "./enterprise-auth-dto";
import jwt from "jsonwebtoken";


export class EnterpriseAuthUseCase {

    constructor(
        private userRepository: UserRepository
    ) {}

    async perform(dto: EnterpriseAuthDTO) {
        
        const enterpriseExists = await this.userRepository
        .getUserBy(dto.email);

        if(!enterpriseExists) {
            throw new Error("Invalid email or password.")
        }

        const passwordIsOk = await compare(dto.password, enterpriseExists.password);

        if(!passwordIsOk) {
            throw new Error("Invalid email or password.")
        }

        const token = jwt.sign({
            subject: enterpriseExists.id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        return token
    }
}