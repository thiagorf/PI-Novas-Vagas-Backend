import { Jobs } from "../../../src/modules/jobs/core/entity/Jobs";
import { JobsRepository } from "../../../src/modules/jobs/infra/repositories/jobs-repository";
import { JobsRequiredInfo, JobsRequiredUpdateInfo } from "../../../src/modules/jobs/types";

export class InMemoryJobsRepository implements JobsRepository {
    private id = 0;
    private jobs: Jobs[] = [];

    async getAllJobs(): Promise<Jobs[]> {
        return this.jobs;
    }

    async getOneJob(jobId: number): Promise<Jobs> {
        const jobs = this.jobs.find((job) => job.id === jobId);

        return jobs;
    }

    async createANewJob(jobInfo: JobsRequiredInfo): Promise<Jobs> {
        const newJob: Jobs = {
            ...jobInfo,
            id: this.id,
        };

        this.id++;

        this.jobs.push(newJob);

        return newJob;
    }
    updateAJob: (jobId: number, jobInfo: JobsRequiredUpdateInfo) => Promise<Jobs>;
    deleteAJob: (jobId: number) => Promise<Jobs>;
}
