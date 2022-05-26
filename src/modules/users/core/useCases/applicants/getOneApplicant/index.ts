import { PrismaApplicantRepository } from "../../../../infra/repositories/prisma-applicant-repository";
import { GetOneApplicantController } from "./get-one-applicant-controller";
import { GetOneApplicantUseCase } from "./get-one-applicant-use-case";

const applicantRepository = new PrismaApplicantRepository();

const getOneApplicantUseCase = new GetOneApplicantUseCase(applicantRepository);

const getOneApplicantController = new GetOneApplicantController();

export { getOneApplicantUseCase, getOneApplicantController };
