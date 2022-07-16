import { Applicant } from "@prisma/client";
import { CreateApplicantDTO } from "../../../src/modules/users/core/useCases/applicants/createApplicant/create-applicant-dto";
import { ApplicantRepository } from "../../../src/modules/users/infra/repositories/applicant-repository";
import { ApplicantInformation } from "../helpers/user-types";

export class InMemoryApplicantRepository implements ApplicantRepository {
    private id = 0;
    private applicants: ApplicantInformation[] = [];

    async createAnApplicant(applicantData: CreateApplicantDTO): Promise<Applicant> {
        const newApplicant = {
            id: this.id,
            user_id: this.id,
            ...applicantData,
        };

        this.applicants.push(newApplicant);

        return newApplicant;
    }

    async getApplicantBy(email: string): Promise<Applicant> {
        const applicant = this.applicants.find((applicant) => applicant.user.email === email);

        return applicant;
    }

    async getAllApllicants(): Promise<Applicant[]> {
        return this.applicants;
    }

    async getApplicantByUserId(user_id: number): Promise<Applicant> {
        const applicant = this.applicants.find((applicant) => applicant.user_id === user_id);

        return applicant;
    }

    async getApplicantJobs(user_id: number): Promise<any> {
        const applicantJobs = this.applicants.find((applicant) => applicant.user_id === user_id);

        return applicantJobs;
    }

    async getApplicantById(applicant_id: number): Promise<Applicant> {
        const applicant = this.applicants.find((applicant) => applicant.id === applicant_id);

        return applicant;
    }

    async getAllApplicantInfo(applicant_id: number): Promise<Applicant> {
        const applicant = this.applicants.find((applicant) => applicant.id === applicant_id);

        return applicant;
    }
}
