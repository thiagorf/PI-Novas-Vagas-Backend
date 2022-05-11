import { DeleteJobUseCase } from "../../core/useCases/delete-job-use-case";
import { PrismaJobsRepository } from "../../infra/repositories/prisma-jobs-repository";


const jobRepository = new PrismaJobsRepository()
const deleteJobUseCase = new DeleteJobUseCase(
    jobRepository
);

export { deleteJobUseCase }