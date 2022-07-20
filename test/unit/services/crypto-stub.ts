import { CheckPasswordData, CryptoService } from "../../../src/modules/users/infra/service/crypto/crypto-service";

export class CryptoStub implements CryptoService {
    async hashPassword(password: string): Promise<string> {
        return password + "HASH";
    }

    async checkPassword({ hashedPassword, providedPassword }: CheckPasswordData): Promise<boolean> {
        const isPasswordOk = hashedPassword === providedPassword + "HASH";
        console.log(isPasswordOk);
        console.log(hashedPassword);
        console.log(providedPassword);

        return isPasswordOk;
    }
}
