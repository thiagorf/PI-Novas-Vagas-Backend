 import { JobsRepository } from "../../infra/repositories/jobs-repository"
import { JobsRequiredInfo } from "../../types"


export class CreateJobUseCase {

    constructor(
        private jobRepository: JobsRepository
    ) {}

    async perform(jobsData: JobsRequiredInfo) {

        const result = await this.jobRepository.createANewJob(jobsData);

        return result;
    }
}