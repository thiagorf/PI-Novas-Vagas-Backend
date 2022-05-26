export interface TokenPayload {
    sub: number;
}

export interface AuthTokenService {
    encode(payload: TokenPayload): string;
    decode(token: string): TokenPayload;
}
