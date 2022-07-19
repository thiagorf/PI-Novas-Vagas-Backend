import { DeleteJobUseCase } from "../../../../../src/modules/jobs/core/useCases/deleteJob/delete-job-use-case";
import { JobsBuilder } from "../../../builders/jobs-builder";
import { InMemoryJobsRepository } from "../../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const deleteJob = new DeleteJobUseCase(inMemoryJobsRepository);

    return { deleteJob, inMemoryJobsRepository };
};

describe("Delete Job", () => {
    it("Should be able to delete a job", async () => {
        const { deleteJob, inMemoryJobsRepository } = prepareUseCase();

        const jobsBuilder = JobsBuilder.aJob().build();

        for (let i = 0; i < 2; i++) {
            await inMemoryJobsRepository.createANewJob(jobsBuilder);
        }

        const allJobs = await inMemoryJobsRepository.getAllJobs();

        const sut = await deleteJob.perform(allJobs[0].id);

        const match = allJobs.find((job) => job.id === sut.id);

        expect(allJobs).toHaveLength(1);
        expect(match).toBeUndefined();
    });

    it("Should not be able to delete an inexisting job", () => {
        const { deleteJob } = prepareUseCase();

        expect(async () => {
            await deleteJob.perform(0);
        }).rejects.toThrowError("Invalid job or inexisting");
    });
});
