import { GetAllJobsUseCase } from "../../core/useCases/get-all-jobs-use-case"
import { PrismaJobsRepository } from "../../infra/repositories/prisma-jobs-repository";

const jobRepository = new PrismaJobsRepository()
const getAllJobsUseCase = new GetAllJobsUseCase(
    jobRepository
);


export { getAllJobsUseCase }