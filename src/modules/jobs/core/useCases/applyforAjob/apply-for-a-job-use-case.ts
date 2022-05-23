import { JobsRepository } from "../../../infra/repositories/jobs-repository";
import { ApplicantRepository } from "../../../../users/infra/repositories/applicant-repository";
import { ApplyRepository } from "../../../../users/infra/repositories/apply-repository";
import { ApplyForAJobDTO } from "./apply-for-a-job-dto";

export class ApplyForAJobUseCase {

    constructor(
        private applicantRepository: ApplicantRepository,
        private jobsRepository: JobsRepository,
        private applyRepository: ApplyRepository
    ) {}

    async perform(dto: ApplyForAJobDTO) {
        const applicant = await this.applicantRepository.getApplicantByUserId(dto.user_id)

        if(!applicant) {
            throw new Error("Invalid applicant")
        }

        const jobs = await this.jobsRepository.getOneJob(dto.jobs_id);

        if(!jobs) {
            throw new Error("Invalid job.")
        }

        const applicantHasAlreadyApplied = await this.applyRepository
        .hasAlreadyApplied(applicant.id, jobs.id)

        if(applicantHasAlreadyApplied) {
            throw new Error("User already applied.")
        }

        const applyForAJob = await this.applyRepository.apply(applicant.id, jobs.id);

        return applyForAJob
    }
}