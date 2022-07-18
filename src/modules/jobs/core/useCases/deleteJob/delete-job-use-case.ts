import { JobsRepository } from "../../../infra/repositories/jobs-repository";

export class DeleteJobUseCase {
    constructor(private jobRepository: JobsRepository) {}

    async perform(jobId: number) {
        const jobExists = await this.jobRepository.getOneJob(jobId);

        if (!jobExists) {
            throw new Error("Invalid job or inexisting");
        }

        const result = await this.jobRepository.deleteAJob(jobId);

        return result;
    }
}
