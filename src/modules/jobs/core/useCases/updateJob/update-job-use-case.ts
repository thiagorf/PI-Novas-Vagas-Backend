import { JobsRepository } from "../../../infra/repositories/jobs-repository";
import { JobsRequiredUpdateInfo } from "../../../types";

export class UpdateJobUseCase {
    constructor(private jobRepository: JobsRepository) {}

    async perform(jobId: number, jobData: JobsRequiredUpdateInfo) {
        const userExsists = await this.jobRepository.getOneJob(jobId);

        if (!userExsists) {
            throw new Error("Invalid or inexisting job");
        }

        const result = await this.jobRepository.updateAJob(jobId, jobData);

        return result;
    }
}
