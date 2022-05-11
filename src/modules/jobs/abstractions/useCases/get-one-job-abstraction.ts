import { GetOneJobUseCase } from "../../core/useCases/get-one-job-use-case";
import { PrismaJobsRepository } from "../../infra/repositories/prisma-jobs-repository";


const jobRepository = new PrismaJobsRepository()
const getOneJobUseCase = new GetOneJobUseCase(jobRepository);

export { getOneJobUseCase }