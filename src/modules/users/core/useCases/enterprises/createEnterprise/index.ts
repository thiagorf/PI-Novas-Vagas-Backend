import { PrismaEnterpriseRepository } from "../../../../infra/repositories/prisma-enterprise-repository";
import { CreateEnterpriseController } from "./create-enterprise-controller";
import { CreateEnterpriseUseCase } from "./create-enterprise-use-case";

const enterpriseRepository = new PrismaEnterpriseRepository();
const createEnterpriseUseCase = new CreateEnterpriseUseCase(enterpriseRepository);

const createEnterpriseController = new CreateEnterpriseController();

export { createEnterpriseController, createEnterpriseUseCase };
