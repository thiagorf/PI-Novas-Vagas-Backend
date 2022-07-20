import { PrismaApplicantRepository } from "../../../../infra/repositories/prisma-applicant-repository";
import { Bcrypt } from "../../../../infra/service/crypto/bcrypt";
import { CreateApplicantController } from "./create-applicant-controller";
import { CreateApplicantUseCase } from "./create-applicant-use-case";

const applicantRepository = new PrismaApplicantRepository();
const cryptoService = new Bcrypt();
const createApplicantUseCase = new CreateApplicantUseCase(applicantRepository, cryptoService);

const createApplicantController = new CreateApplicantController();

export { createApplicantUseCase, createApplicantController };
