import { UpdateJobUseCase } from "../../../../src/modules/jobs/core/useCases/updateJob/update-job-use-case";
import { JobsBuilder } from "../../builders/jobs-builder";
import { InMemoryJobsRepository } from "../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const updateJob = new UpdateJobUseCase(inMemoryJobsRepository);

    return { updateJob, inMemoryJobsRepository };
};

describe("Update Job", () => {
    it("Should be able to update a job", async () => {
        const { updateJob, inMemoryJobsRepository } = prepareUseCase();

        const jobsBuilder = JobsBuilder.aJob().build();
        const differentJob = JobsBuilder.aJob().withDifferentData().build();

        const job = await inMemoryJobsRepository.createANewJob(jobsBuilder);
        const sut = await updateJob.perform(job.id, differentJob);

        expect(sut).toMatchObject(differentJob);
        expect(sut).not.toMatchObject(jobsBuilder);
    });

    it("Should not be able to update a inexisting job", async () => {
        const { updateJob } = prepareUseCase();

        const jobBuilder = JobsBuilder.aJob().build();

        expect(async () => {
            await updateJob.perform(0, jobBuilder);
        }).rejects.toThrowError("Invalid or inexisting job");
    });
});
