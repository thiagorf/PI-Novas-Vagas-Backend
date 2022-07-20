import { AuthTokenService, TokenPayload } from "../../../src/modules/users/infra/service/tokenAuth/auth-token-service";

export class JwtAuthStub implements AuthTokenService {
    encode(payload: TokenPayload): string {
        return payload + "ENCRYPTED";
    }
    decode(token: string): TokenPayload {
        return {
            sub: Number(token),
        };
    }
}
