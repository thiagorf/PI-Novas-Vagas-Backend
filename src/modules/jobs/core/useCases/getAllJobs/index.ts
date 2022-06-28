import { PrismaJobsRepository } from "../../../infra/repositories/prisma-jobs-repository";
import { GetAllJobsController } from "./get-all-jobs-controller";
import { GetAllJobsSort } from "./get-all-jobs-sort";
import { GetAllJobsUseCase } from "./get-all-jobs-use-case";

const jobRepository = new PrismaJobsRepository();
const getAllJobsUseCase = new GetAllJobsUseCase(jobRepository);

const getAllJobsSort = new GetAllJobsSort(jobRepository);

const getAllJobsController = new GetAllJobsController();

export { getAllJobsUseCase, getAllJobsController, getAllJobsSort };
