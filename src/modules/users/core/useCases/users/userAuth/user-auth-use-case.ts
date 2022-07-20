import { AuthTokenService } from "../../../../infra/service/tokenAuth/auth-token-service";
import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";
import { ApplicantRepository } from "../../../../infra/repositories/applicant-repository";
import { CryptoService } from "../../../../infra/service/crypto/crypto-service";
import { UserRepository } from "../../../../infra/repositories/user-repository";
import { AuthApplicant, AuthEnterprise } from "./user-types";
import { UserAuthDTO } from "./user-auth-dto";

export class UserAuthUseCase {
    constructor(
        private userRepository: UserRepository,
        private applicantRepository: ApplicantRepository,
        private enterpriseRepository: EnterpriseRepository,
        private authService: AuthTokenService,
        private crypto: CryptoService,
    ) {}

    async perform(dto: UserAuthDTO) {
        const userExist = await this.userRepository.getUserBy(dto.email);

        if (!userExist) {
            throw new Error("Invalid or inexisting user");
        }

        const passwordIsOK = await this.crypto.checkPassword({
            providedPassword: dto.password,
            hashedPassword: userExist.password,
        });

        if (!passwordIsOK) {
            throw new Error("Invalid email or password.");
        }

        const { email, name, type } = userExist;

        const token = this.authService.encode({
            sub: userExist.id,
        });

        if (userExist.type === "enterprise") {
            const enterpriseData = await this.enterpriseRepository.getEnterpriseByUserId(userExist.id);

            return this.formatAuthResponse(token, { ...enterpriseData, email, name, type });
        }

        const applicantData = await this.applicantRepository.getApplicantByUserId(userExist.id);

        return this.formatAuthResponse(token, { ...applicantData, email, name, type });
    }

    private formatAuthResponse(token: string, userType: AuthApplicant | AuthEnterprise) {
        return {
            token: token,
            user: userType,
        };
    }
}
