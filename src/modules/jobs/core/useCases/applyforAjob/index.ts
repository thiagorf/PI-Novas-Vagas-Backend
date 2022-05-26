import { PrismaJobsRepository } from "../../../infra/repositories/prisma-jobs-repository";
import { PrismaApplicantRepository } from "../../../../users/infra/repositories/prisma-applicant-repository";
import { PrismaApplyRepository } from "../../../../users/infra/repositories/prisma-apply-repository";
import { ApplyForAJobUseCase } from "./apply-for-a-job-use-case";
import { ApplyForAJobController } from "./apply-for-a-job-controller";

const applicantRepository = new PrismaApplicantRepository();
const jobsRepository = new PrismaJobsRepository();
const applyRepository = new PrismaApplyRepository();

const applyForAJobUseCase = new ApplyForAJobUseCase(applicantRepository, jobsRepository, applyRepository);

const applyForAJobController = new ApplyForAJobController();

export { applyForAJobUseCase, applyForAJobController };
