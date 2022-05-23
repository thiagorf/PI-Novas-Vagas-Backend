import { ApplicantRepository } from "../../../../infra/repositories/applicant-repository";
import { UserRepository } from "../../../../infra/repositories/user-repository";
import { AuthTokenService } from "../../../../infra/service/tokenAuth/auth-token-service";
import { CheckJwtDTO } from "./check-jwt-dto";

export class CheckJwtUseCase {
    constructor(
        private authService: AuthTokenService,
        private userRepository: UserRepository
    ) {}
    async perform(dto: CheckJwtDTO) {
        try {
            const decoded = this.authService.decode(dto.token)
            
            if(!decoded) {
                throw new Error("Invalid Token");
            }

            const userExists = await this.userRepository.getUserById(decoded.sub)

            if(!userExists) {
                throw new Error("Invalid Token!")
            }

            return {
                ok: true
            }
            
        } catch (error) {
            //padronizar response de autenticação
            return {
                ok: false
            }
        }
    }
}