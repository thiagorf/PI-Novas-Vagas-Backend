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

describe("Create Job Test", () => {
    it("Should be able to create a new job", async () => {
        const { createJobUseCase, inMemoryEnterpriseRepository } = prepareUseCase();

        const userBuilder = UsersBuilder.aUser().withEnterpriseInfo().build();
        const enterpriseData = EnterpriseBuilder.aEnterprise().withUserId(userBuilder.id).build();

        await inMemoryEnterpriseRepository.createAnEnterprise({ ...userBuilder, ...enterpriseData });

        const jobsBuilder = JobsBuilder.aJob().withEnterpriseId(enterpriseData.id).build();

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
