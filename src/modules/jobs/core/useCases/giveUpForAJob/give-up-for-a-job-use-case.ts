import { ApplicantRepository } from "../../../../users/infra/repositories/applicant-repository";
import { ApplyRepository } from "../../../../users/infra/repositories/apply-repository";
import { JobsRepository } from "../../../infra/repositories/jobs-repository";
import { GiveUpForAJobDTO } from "./give-up-for-a-job-dto";

export class GiveUpForAJobUseCase {
    constructor(
        private jobsRepository: JobsRepository,
        private applicantRepository: ApplicantRepository,
        private applyRepository: ApplyRepository,
    ) {}
    async perform(dto: GiveUpForAJobDTO) {
        const applicant = await this.applicantRepository.getApplicantByUserId(dto.user_id);

        if (!applicant) {
            throw new Error("Invalid applicant");
        }

        const jobs = await this.jobsRepository.getOneJob(dto.jobs_id);

        if (!jobs) {
            throw new Error("Invalid job.");
        }

        const hasApplied = await this.applyRepository.hasAlreadyApplied(applicant.id, jobs.id);

        if (!hasApplied) {
            throw new Error("Invalid applicant");
        }

        const giveUp = await this.applyRepository.giveUp(applicant.id, jobs.id);

        return giveUp;
    }
}
