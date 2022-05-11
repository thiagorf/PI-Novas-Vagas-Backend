import { JobsRepository } from "../../infra/repositories/jobs-repository";



export class GetOneJobUseCase {

    constructor(
        private jobRepository: JobsRepository
    ) {}

    async perform(jobId: number) {
        const result = await this.jobRepository.getOneJob(jobId);

        return result;
    }
}