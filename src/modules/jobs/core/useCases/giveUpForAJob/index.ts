import { PrismaApplicantRepository } from "../../../../users/infra/repositories/prisma-applicant-repository";
import { PrismaApplyRepository } from "../../../../users/infra/repositories/prisma-apply-repository";
import { PrismaJobsRepository } from "../../../infra/repositories/prisma-jobs-repository";
import { GiveUpForAJobController } from "./give-up-for-a-job-controller";
import { GiveUpForAJobUseCase } from "./give-up-for-a-job-use-case";


const jobsRepository = new PrismaJobsRepository();
const applicantRepository = new PrismaApplicantRepository();
const applyRepository = new PrismaApplyRepository();

const giveUpForAJobUseCase = new GiveUpForAJobUseCase(
    jobsRepository,
    applicantRepository,
    applyRepository
);

const giveUpForAJobController = new GiveUpForAJobController();

export {
    giveUpForAJobUseCase,
    giveUpForAJobController
}