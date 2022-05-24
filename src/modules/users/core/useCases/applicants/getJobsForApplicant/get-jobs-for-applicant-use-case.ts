import { ApplicantRepository } from "../../../../infra/repositories/applicant-repository";
import { ApplyRepository } from "../../../../infra/repositories/apply-repository";

export class GetJobsForApplicantUseCase {

    constructor(
        private applicantRepository: ApplicantRepository,
        private applyRepository: ApplyRepository
    ) {}

    async perform(applicant_id: number, authenticated_id: number) {
        //middleware for match auth_id and resource id?
        const applicant = await this.applicantRepository.getApplicantByUserId(authenticated_id);

        if(!applicant) {
            throw new Error("Invalid applicant.")
        }

        if(applicant.id != applicant_id) {
            throw new Error("unauthorized.")
        }

        const applicantJobs = await this.applyRepository.getJobsForAnApplicant(applicant.id);

        return applicantJobs;
    }
}