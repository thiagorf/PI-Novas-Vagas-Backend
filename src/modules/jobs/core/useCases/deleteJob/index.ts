import { PrismaJobsRepository } from "../../../infra/repositories/prisma-jobs-repository";
import { DeleteJobController } from "./delete-job-controller";
import { DeleteJobUseCase } from "./delete-job-use-case";




const jobRepository = new PrismaJobsRepository();
const deleteJobUseCase = new DeleteJobUseCase(
    jobRepository
);

const deleteJobController = new DeleteJobController();

export { deleteJobController, deleteJobUseCase }