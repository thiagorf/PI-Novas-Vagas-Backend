import { PrismaEnterpriseRepository } from "../../../../users/infra/repositories/prisma-enterprise-repository";
import { PrismaJobsRepository } from "../../../infra/repositories/prisma-jobs-repository";
import { CreateJobController } from "./create-job-controller";
import { CreateJobUseCase } from "./create-job-use-case";

const jobRepository = new PrismaJobsRepository();
const enterpriseRepository = new PrismaEnterpriseRepository();
const createJobUseCase = new CreateJobUseCase(
    jobRepository,
    enterpriseRepository
)


const createJobController = new CreateJobController();

export {
    createJobController,
    createJobUseCase
}