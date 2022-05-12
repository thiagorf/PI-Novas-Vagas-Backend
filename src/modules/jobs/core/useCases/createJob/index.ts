import { PrismaJobsRepository } from "../../../infra/repositories/prisma-jobs-repository";
import { CreateJobController } from "./create-job-controller";
import { CreateJobUseCase } from "./create-job-use-case";



const jobRepository = new PrismaJobsRepository()
const createJobUseCase = new CreateJobUseCase(jobRepository)


const createJobController = new CreateJobController();


export {
    createJobController,
    createJobUseCase
}