import { PrismaApplicantRepository } from "../../../../infra/repositories/prisma-applicant-repository";
import { CreateApplicantController } from "./create-applicant-controller";
import { CreateApplicantUseCase } from "./create-applicant-use-case";


const applicantRepository = new PrismaApplicantRepository()
const createApplicantUseCase = new CreateApplicantUseCase(
    applicantRepository
)

const createApplicantController = new CreateApplicantController();

export { createApplicantUseCase, createApplicantController }