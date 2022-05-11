import { UpdateJobUseCase } from "../../core/useCases/update-job-use-case";
import { PrismaJobsRepository } from "../../infra/repositories/prisma-jobs-repository";


const jobRepository = new PrismaJobsRepository();
const updateJobUseCase = new UpdateJobUseCase(
    jobRepository
);

export { updateJobUseCase }