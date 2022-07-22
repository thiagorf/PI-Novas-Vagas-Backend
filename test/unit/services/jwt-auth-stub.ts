import { AuthTokenService, TokenPayload } from "../../../src/modules/users/infra/service/tokenAuth/auth-token-service";

export class JwtAuthStub implements AuthTokenService {
    encode(payload: TokenPayload): string {
        return payload.sub + "ENCRYPTED";
    }
    decode(token: string): TokenPayload | Error {
        const id = Number(token.substring(0, token.indexOf("ENCRYPTED")));

        if (!id) {
            throw new Error("Invalid Token");
        }

        return {
            sub: id,
        };
    }
}
