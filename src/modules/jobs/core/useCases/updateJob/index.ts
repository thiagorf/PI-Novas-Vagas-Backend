import { PrismaJobsRepository } from "../../../infra/repositories/prisma-jobs-repository";
import { UpdateJobController } from "./update-job-controller";
import { UpdateJobUseCase } from "./update-job-use-case";

const jobRepository = new PrismaJobsRepository();
const updateJobUseCase = new UpdateJobUseCase(jobRepository);

const updateJobController = new UpdateJobController();

export { updateJobController, updateJobUseCase };
