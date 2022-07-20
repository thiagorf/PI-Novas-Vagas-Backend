import { hash, compare } from "bcrypt";
import { CheckPasswordData, CryptoService } from "./crypto-service";

export class Bcrypt implements CryptoService {
    private saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        const hashedPassword = await hash(password, this.saltRounds);

        return hashedPassword;
    }

    async checkPassword({ hashedPassword, providedPassword }: CheckPasswordData): Promise<boolean> {
        const isPasswordOk = await compare(providedPassword, hashedPassword);

        return isPasswordOk;
    }
}
