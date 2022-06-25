import { PrismaEnterpriseRepository } from "../../../../infra/repositories/prisma-enterprise-repository";
import { GetOneJobForEnterpriseController } from "./get-one-job-for-enterprise-controller";
import { GetOneJobForEnterpriseUseCase } from "./get-one-job-for-enterprise-use-case";

const enterpriseRepository = new PrismaEnterpriseRepository();

const getOneJobForEnterpriseUseCase = new GetOneJobForEnterpriseUseCase(enterpriseRepository);
const getOneJobForEnterpriseControoler = new GetOneJobForEnterpriseController();

export { getOneJobForEnterpriseUseCase, getOneJobForEnterpriseControoler };
