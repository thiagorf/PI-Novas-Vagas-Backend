import { PrismaEnterpriseRepository } from "../../../../infra/repositories/prisma-enterprise-repository";
import { GetOneEnterpiseController } from "./get-one-enterprise-controller";
import { GetOneEnterpriseUseCase } from "./get-one-enterprise-use-case";

const enterpriseRepository = new PrismaEnterpriseRepository();

const getOneEnterpriseUseCase = new GetOneEnterpriseUseCase(enterpriseRepository);

const getOneEnterpriseController = new GetOneEnterpiseController();

export { getOneEnterpriseUseCase, getOneEnterpriseController };
