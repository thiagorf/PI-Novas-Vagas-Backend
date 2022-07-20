export type CheckPasswordData = {
    providedPassword: string;
    hashedPassword: string;
};

export interface CryptoService {
    hashPassword(password: string): Promise<string>;
    checkPassword(comparePassword: CheckPasswordData): Promise<boolean>;
}
