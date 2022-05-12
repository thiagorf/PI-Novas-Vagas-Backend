import { PrismaJobsRepository } from "../../../infra/repositories/prisma-jobs-repository";
import { GetOneJobController } from "./get-one-job-controller";
import { GetOneJobUseCase } from "./get-one-job-use-case";




const jobRepository = new PrismaJobsRepository();
const getOneJobUseCase = new GetOneJobUseCase(
    jobRepository
);

const getOneJobController = new GetOneJobController();


export { getOneJobController, getOneJobUseCase }