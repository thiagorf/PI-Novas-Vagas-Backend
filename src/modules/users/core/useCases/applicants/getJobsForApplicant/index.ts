import { PrismaApplicantRepository } from "../../../../infra/repositories/prisma-applicant-repository";
import { PrismaApplyRepository } from "../../../../infra/repositories/prisma-apply-repository";
import { GetJobsForApplicantController } from "./get-jobs-for-applicant-controller";
import { GetJobsForApplicantUseCase } from "./get-jobs-for-applicant-use-case";

const applicantRepository = new PrismaApplicantRepository();
const applyRepository = new PrismaApplyRepository();
const getJobsForApplicantUseCase = new GetJobsForApplicantUseCase(applicantRepository, applyRepository);

const getJobsForApplicantController = new GetJobsForApplicantController();

export { getJobsForApplicantUseCase, getJobsForApplicantController };
