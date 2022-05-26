import { PrismaApplicantRepository } from "../../../../infra/repositories/prisma-applicant-repository";
import { GetApllicantsUseCase } from "./get-all-apllicants-use-case";
import { GetAllApllicantsController } from "./get-all-applicants-controller";

const applicantRepository = new PrismaApplicantRepository();
const getAllApllicantsUseCase = new GetApllicantsUseCase(applicantRepository);

const getAllApplicantsController = new GetAllApllicantsController();

export { getAllApllicantsUseCase, getAllApplicantsController };
