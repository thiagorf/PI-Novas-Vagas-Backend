import { UserRepository } from "../../../../infra/repositories/user-repository";
import { AuthTokenService } from "../../../../infra/service/tokenAuth/auth-token-service";

export class CheckJwtUseCase {
    constructor(private authService: AuthTokenService, private userRepository: UserRepository) {}

    private failRequest = {
        ok: false,
    };

    async perform(token: string) {
        if (!token) {
            return this.failRequest;
        }

        try {
            const decoded = this.authService.decode(token);

            if (decoded instanceof Error) {
                return this.failRequest;
            }

            const userExists = await this.userRepository.getUserById(decoded.sub);

            if (!userExists) {
                return this.failRequest;
            }

            return {
                ok: true,
            };
        } catch (error) {
            return this.failRequest;
        }
    }
}
