import { PrismaUserRepository } from "../../../../infra/repositories/prisma-user-repository";
import { EnterpriseAuthController } from "./enterprise-auth-controller";
import { EnterpriseAuthUseCase } from "./enterprise-auth-use-case";

const userRepository = new PrismaUserRepository();
const enterpriseAuthUseCase = new EnterpriseAuthUseCase(userRepository);

const enterpriseAuthController = new EnterpriseAuthController();

export { enterpriseAuthController, enterpriseAuthUseCase };
