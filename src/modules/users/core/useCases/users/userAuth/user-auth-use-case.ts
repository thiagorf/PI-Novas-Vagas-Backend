import { compare } from "bcrypt";
import { ApplicantRepository } from "../../../../infra/repositories/applicant-repository";
import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";
import { UserRepository } from "../../../../infra/repositories/user-repository";
import { AuthTokenService } from "../../../../infra/service/tokenAuth/auth-token-service";
import { UserAuthDTO } from "./user-auth-dto";



export class UserAuthUseCase {
    constructor(
        private userRepository: UserRepository,
        private applicantRepository: ApplicantRepository,
        private enterpriseRepository: EnterpriseRepository,
        private authService: AuthTokenService
    ) {}

    async perform(dto: UserAuthDTO) {

        const userExist = await this.userRepository.getUserBy(dto.email);

        if(!userExist) {
            throw new Error("User already exists.");
        }

        const passwordIsOK = await compare(dto.password, userExist.password)
        
        if(!passwordIsOK) {
            throw new Error("Invalid email or password.")
        }

        
        const token = this.authService.encode({
            sub: userExist.id
        })

        return {
            token: token,
            user: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                type: userExist.type
            }
        }
    }
}