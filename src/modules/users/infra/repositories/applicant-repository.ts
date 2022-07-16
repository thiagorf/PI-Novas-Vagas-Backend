import { Applicant } from "@prisma/client";
import { ApplicantAllJobs } from "../../core/entity/Applicants";
import { CreateApplicantDTO } from "../../core/useCases/applicants/createApplicant/create-applicant-dto";

export interface ApplicantRepository {
    createAnApplicant(applicantData: CreateApplicantDTO): Promise<Applicant>;
    getApplicantBy(email: string): Promise<Applicant>;
    getAllApllicants(): Promise<Applicant[]>;
    getApplicantByUserId(user_id: number): Promise<Applicant>;
    getApplicantJobs(user_id: number): Promise<ApplicantAllJobs>;
    getApplicantById(applicant_id: number): Promise<Applicant>;
    getAllApplicantInfo(applicant_id: number): Promise<Applicant>;
}
