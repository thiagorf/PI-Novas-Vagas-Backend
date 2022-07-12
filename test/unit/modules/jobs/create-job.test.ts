import { CreateJobUseCase } from "../../../../src/modules/jobs/core/useCases/createJob/create-job-use-case";
import { InMemoryEnterpriseRepository } from "../../inMemory/in-memory-enterprise-repository";
import { InMemoryJobsRepository } from "../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    const createJobUseCase = new CreateJobUseCase(inMemoryJobsRepository, inMemoryEnterpriseRepository);

    return { createJobUseCase };
};

describe("Create Job Test", () => {
    it("Should be able to create a new job", async () => {
        const { createJobUseCase } = prepareUseCase();
    });
});
