import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";
import { AuthTokenService } from "../../../../infra/service/tokenAuth/auth-token-service";
import { CheckEnterpriseJwtDTO } from "./check-enterprise-jwt-dto";


export class CheckEnterpriseJwtUseCase {

    constructor(
        private authService: AuthTokenService,
        private enterpriseRepository: EnterpriseRepository
    ) {}

    async perform(dto: CheckEnterpriseJwtDTO) {
        try {
            const decoded = this.authService.decode(dto.token)

            if(!decoded) {
                throw new Error("Invalid Token");
            }

            const userExists = await this.enterpriseRepository.getEnterpriseByUserId(decoded.sub)

            if(!userExists) {
                throw new Error("Invalid Token!")
            }

            return {
                ok: true
            }
            
        } catch (error) {
            //padronizar response de autenticação
            console.log(error)
            return {
                ok: false
            }
        } 
    }
}