import { PrismaEnterpriseRepository } from "../../../../infra/repositories/prisma-enterprise-repository";
import { JwtAuth } from "../../../../infra/service/tokenAuth/jwt-auth";
import { CheckEnterpriseJwtController } from "./check-enterprise-jwt-controller";
import { CheckEnterpriseJwtUseCase } from "./check-enterprise-jwt-use-case";

const enterpriseRepository = new PrismaEnterpriseRepository()
const authService =  new JwtAuth()

const checkEnterpriseJwtUseCase = new CheckEnterpriseJwtUseCase(
    authService,
    enterpriseRepository
)

const checkEnterpriseJwtController = new CheckEnterpriseJwtController()

export {
    checkEnterpriseJwtUseCase,
    checkEnterpriseJwtController
}