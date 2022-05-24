import { Applicant } from "@prisma/client";
import { CreateApplicantDTO } from "../../core/useCases/applicants/createApplicant/create-applicant-dto";

export interface ApplicantRepository {
    createAnApplicant(applicantData: CreateApplicantDTO): Promise<Applicant>
    getApplicantBy(email: string): Promise<Applicant>
    getAllApllicants(): Promise<Applicant[]>
    getApplicantByUserId(user_id: number): Promise<Applicant>
    getApplicantJobs(user_id: number): Promise<Applicant>
}