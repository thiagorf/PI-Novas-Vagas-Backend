import { AuthTokenService, TokenPayload } from "./auth-token-service";
import { sign, verify } from "jsonwebtoken";

export class JwtAuth implements AuthTokenService {
    encode(payload: TokenPayload): string {
        const token = sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return token;
    }

    decode(token: string): TokenPayload {
        const decodedToken = verify(token, process.env.JWT_SECRET) as unknown as TokenPayload;

        return decodedToken;
    }
}
