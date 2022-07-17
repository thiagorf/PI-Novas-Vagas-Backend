import { CreateJobUseCase } from "../../../../src/modules/jobs/core/useCases/createJob/create-job-use-case";
import { EnterpriseBuilder } from "../../builders/enterprise-builder";
import { JobsBuilder } from "../../builders/jobs-builder";
import { UsersBuilder } from "../../builders/users-builder";
import { InMemoryEnterpriseRepository } from "../../inMemory/in-memory-enterprise-repository";
import { InMemoryJobsRepository } from "../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    const createJobUseCase = new CreateJobUseCase(inMemoryJobsRepository, inMemoryEnterpriseRepository);

    return { createJobUseCase, inMemoryEnterpriseRepository };
};

const prepareData = () => {
    const userBuilder = UsersBuilder.aUser().withEnterpriseInfo().build();
    const enterpriseBuilder = EnterpriseBuilder.aEnterprise().withUserId(userBuilder.id).build();
    const jobsBuilder = JobsBuilder.aJob().withEnterpriseId(enterpriseBuilder.id).build();

    const enterpriseData = { ...userBuilder, ...enterpriseBuilder };

    return { enterpriseData, jobsBuilder };
};

describe("Create Job Test", () => {
    it("Should be able to create a new job", async () => {
        const { createJobUseCase, inMemoryEnterpriseRepository } = prepareUseCase();
        const { enterpriseData, jobsBuilder } = prepareData();

        await inMemoryEnterpriseRepository.createAnEnterprise(enterpriseData);

        const sut = await createJobUseCase.perform({ ...jobsBuilder, user_id: enterpriseData.user_id });

        expect(sut).toMatchObject(jobsBuilder);
    });

    it("Should not be able to create a job for an invalid enterprise", async () => {
        const { createJobUseCase } = prepareUseCase();

        const jobsBuilder = JobsBuilder.aJob().build();

        expect(async () => {
            await createJobUseCase.perform({ ...jobsBuilder, user_id: 0 });
        }).rejects.toThrowError("Invalid enterprise");
    });
});
