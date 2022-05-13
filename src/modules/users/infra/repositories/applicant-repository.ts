import { Applicant } from "@prisma/client";
import { CreateApplicantDTO } from "../../core/useCases/createApplicant/create-applicant-dto";

export interface ApplicantRepository {
    createAnApplicant(applicantData: CreateApplicantDTO): Promise<Applicant>
    getApplicantBy(email: string): Promise<Applicant>
    getAllApllicants(): Promise<Applicant[]>

}