import { GetAllJobsUseCase } from "../../../../src/modules/jobs/core/useCases/getAllJobs/get-all-jobs-use-case";
import { InMemoryJobsRepository } from "../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const getAllJobsUseCase = new GetAllJobsUseCase(inMemoryJobsRepository);

    return { getAllJobsUseCase };
};

describe("Get All Jobs", () => {
    it("Should be able to get all jobs", async () => {
        const { getAllJobsUseCase } = prepareUseCase();

        const sut = await getAllJobsUseCase.perform();

        expect(sut).toBe([]);
    });
});
