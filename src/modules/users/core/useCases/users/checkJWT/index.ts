import { PrismaApplicantRepository } from "../../../../infra/repositories/prisma-applicant-repository";
import { PrismaUserRepository } from "../../../../infra/repositories/prisma-user-repository";
import { JwtAuth } from "../../../../infra/service/tokenAuth/jwt-auth";
import { CheckJwtController } from "./check-jwt-controller";
import { CheckJwtUseCase } from "./check-jwt-use-case";


const userRepository = new PrismaUserRepository();
const authService = new JwtAuth();

const checkJwtUseCase = new CheckJwtUseCase(
    authService,
    userRepository
);

const checkJwtController = new CheckJwtController();

export {
    checkJwtUseCase,
    checkJwtController
}