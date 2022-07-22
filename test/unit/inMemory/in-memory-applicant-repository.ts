import { Applicant } from "@prisma/client";
import { ApplicantAllJobs, ApplicantJobs } from "../../../src/modules/users/core/entity/Applicants";
import { CreateApplicantDTO } from "../../../src/modules/users/core/useCases/applicants/createApplicant/create-applicant-dto";
import { ApplicantRepository } from "../../../src/modules/users/infra/repositories/applicant-repository";
import { ApplicantInformation } from "../helpers/user-types";

export class InMemoryApplicantRepository implements ApplicantRepository {
    private id = 1;
    private applicants: ApplicantInformation[] = [];
    private jobs: ApplicantJobs[] = [];

    public populateJobs(jobs: ApplicantJobs) {
        this.jobs.push(jobs);
    }

    async createAnApplicant(applicantData: CreateApplicantDTO): Promise<Applicant> {
        const { name, email, password } = applicantData;

        const newApplicant: ApplicantInformation = {
            id: this.id,
            user_id: this.id,
            ...applicantData,
            user: {
                name,
                email,
                password,
            },
        };

        this.id++;

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

    async getApplicantJobs(user_id: number): Promise<ApplicantAllJobs> {
        const applicant = this.applicants.find((applicant) => applicant.user_id === user_id);

        const {
            id,
            user: { name, email },
        } = applicant;

        const applicantJobs: ApplicantAllJobs = {
            id,
            name,
            email,
            jobs: this.jobs,
        };

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
