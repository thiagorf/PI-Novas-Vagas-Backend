import { PrismaEnterpriseRepository } from "../../../../infra/repositories/prisma-enterprise-repository";
import { GetJobsEnterpriseController } from "./get-jobs-for-enterprise-controller";
import { GetJobsEnterpriseUseCase } from "./get-jobs-for-enterprise-use-case";

const enterpriseRepository = new PrismaEnterpriseRepository();
const getJobsEnterpriseUseCase = new GetJobsEnterpriseUseCase(enterpriseRepository);

const getJobsForEnterpriseController = new GetJobsEnterpriseController();

export { getJobsEnterpriseUseCase, getJobsForEnterpriseController };
