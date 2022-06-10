import { UserRepository } from "../../../../infra/repositories/user-repository";
import { AuthTokenService } from "../../../../infra/service/tokenAuth/auth-token-service";

export class CheckJwtUseCase {
    constructor(private authService: AuthTokenService, private userRepository: UserRepository) {}
    async perform(token: string) {
        try {
            if (!token) {
                throw new Error("Invalid token");
            }

            const decoded = this.authService.decode(token);

            if (!decoded) {
                throw new Error("Invalid Token");
            }

            const userExists = await this.userRepository.getUserById(decoded.sub);

            if (!userExists) {
                throw new Error("Invalid Token!");
            }

            return {
                ok: true,
            };
        } catch (error) {
            //padronizar response de autenticação
            return {
                ok: false,
            };
        }
    }
}
