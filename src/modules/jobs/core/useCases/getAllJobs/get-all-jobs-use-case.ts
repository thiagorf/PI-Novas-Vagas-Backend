import { JobsRepository } from "../../../infra/repositories/jobs-repository";

export class GetAllJobsUseCase {
    constructor(private jobRepository: JobsRepository) {}

    async perform() {
        const result = await this.jobRepository.getAllJobs();

        return result;
    }
}
