import { CreateJobUseCase } from "../../core/useCases/create-job-use-case";
import { PrismaJobsRepository } from "../../infra/repositories/prisma-jobs-repository";



const jobRepository = new PrismaJobsRepository();
const createJobUseCase = new CreateJobUseCase(
    jobRepository
);

export { createJobUseCase }