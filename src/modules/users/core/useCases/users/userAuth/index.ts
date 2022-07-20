import { PrismaApplicantRepository } from "../../../../infra/repositories/prisma-applicant-repository";
import { PrismaEnterpriseRepository } from "../../../../infra/repositories/prisma-enterprise-repository";
import { PrismaUserRepository } from "../../../../infra/repositories/prisma-user-repository";
import { JwtAuth } from "../../../../infra/service/tokenAuth/jwt-auth";
import { Bcrypt } from "../../../../infra/service/crypto/bcrypt";
import { UserAuthController } from "./user-auth-controller";
import { UserAuthUseCase } from "./user-auth-use-case";

const userRepository = new PrismaUserRepository();
const applicantRepository = new PrismaApplicantRepository();
const enterpriseRepository = new PrismaEnterpriseRepository();
const authService = new JwtAuth();
const bcryptService = new Bcrypt();
const userAuthUseCase = new UserAuthUseCase(
    userRepository,
    applicantRepository,
    enterpriseRepository,
    authService,
    bcryptService,
);

const userAuthController = new UserAuthController();

export { userAuthUseCase, userAuthController };
