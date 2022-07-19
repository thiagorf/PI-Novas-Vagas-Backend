import { GetJobsEnterpriseUseCase } from "../../../../../../src/modules/users/core/useCases/enterprises/getJobsForEnterprise/get-jobs-for-enterprise-use-case";
import { EnterpriseBuilder } from "../../../../builders/enterprise-builder";
import { JobsBuilder } from "../../../../builders/jobs-builder";
import { UsersBuilder } from "../../../../builders/users-builder";
import { InMemoryEnterpriseRepository } from "../../../../inMemory/in-memory-enterprise-repository";
import { InMemoryJobsRepository } from "../../../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    const getJobsForEnterprise = new GetJobsEnterpriseUseCase(inMemoryEnterpriseRepository);

    return { getJobsForEnterprise, inMemoryEnterpriseRepository, inMemoryJobsRepository };
};

const prepareData = () => {
    const userBuilder = UsersBuilder.aUser().withEnterpriseInfo().build();
    const enterpriseBuilder = EnterpriseBuilder.aEnterprise().withUserId(userBuilder.id).build();

    const enterpriseData = { ...userBuilder, ...enterpriseBuilder };

    const oneJob = JobsBuilder.aJob().withEnterpriseId(enterpriseBuilder.id).build();
    const twoJob = JobsBuilder.aJob().withEnterpriseId(enterpriseBuilder.id).build();

    const jobs = [oneJob, twoJob];

    return { enterpriseBuilder, jobs, enterpriseData };
};

describe("Get Jobs For Enterprise", () => {
    it("Should be able to get jobs for enterprise", async () => {
        const { getJobsForEnterprise, inMemoryEnterpriseRepository, inMemoryJobsRepository } = prepareUseCase();
        const { enterpriseBuilder, jobs, enterpriseData } = prepareData();

        await inMemoryEnterpriseRepository.createAnEnterprise(enterpriseData);
        jobs.forEach(async (job) => {
            await inMemoryJobsRepository.createANewJob(job);
            inMemoryEnterpriseRepository.populateJobs({
                ...job,
                enterprise: {
                    name: "Enterprise name",
                },
            });
        });

        const sut = await getJobsForEnterprise.perform(enterpriseBuilder.id);

        expect(sut.jobs).toHaveLength(2);
    });

    it("Should not be able to get jobs for an invalid enterprise", () => {
        const { getJobsForEnterprise } = prepareUseCase();
        const invalidEnterpriseId = 0;

        expect(async () => {
            await getJobsForEnterprise.perform(invalidEnterpriseId);
        }).rejects.toThrowError("Invalid or inexisting enterprise");
    });
});
