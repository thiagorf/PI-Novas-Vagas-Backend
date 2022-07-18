import { GetOneJobUseCase } from "../../../../src/modules/jobs/core/useCases/getOneJob/get-one-job-use-case";
import { JobsBuilder } from "../../builders/jobs-builder";
import { InMemoryJobsRepository } from "../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const getOneJob = new GetOneJobUseCase(inMemoryJobsRepository);

    return { getOneJob, inMemoryJobsRepository };
};

describe("Get One Job", () => {
    it("Should be able to return a job", async () => {
        const { getOneJob, inMemoryJobsRepository } = prepareUseCase();

        const jobBuilder = JobsBuilder.aJob().build();

        await inMemoryJobsRepository.createANewJob(jobBuilder);

        const sut = await getOneJob.perform(jobBuilder.id);

        expect(sut).toMatchObject(jobBuilder);
    });

    it("Should not be able to return a inexisting job", async () => {
        const { getOneJob } = prepareUseCase();

        expect(async () => {
            await getOneJob.perform(0);
        }).rejects.toThrowError("Invalid or inexisting job");
    });
});
