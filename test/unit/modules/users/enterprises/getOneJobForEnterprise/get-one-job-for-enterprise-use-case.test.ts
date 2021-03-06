import { GetOneJobForEnterpriseUseCase } from "../../../../../../src/modules/users/core/useCases/enterprises/getOneJobForEnterprise/get-one-job-for-enterprise-use-case";
import { ApplicantBuilder } from "../../../../builders/applicant-builder";
import { EnterpriseBuilder } from "../../../../builders/enterprise-builder";
import { JobsBuilder } from "../../../../builders/jobs-builder";
import { UsersBuilder } from "../../../../builders/users-builder";
import { InMemoryApplicantRepository } from "../../../../inMemory/in-memory-applicant-repository";
import { InMemoryEnterpriseRepository } from "../../../../inMemory/in-memory-enterprise-repository";
import { InMemoryJobsRepository } from "../../../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const inMemoryApplicantRepository = new InMemoryApplicantRepository();
    const inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    const getOneJobForEnterprise = new GetOneJobForEnterpriseUseCase(inMemoryEnterpriseRepository);

    return {
        getOneJobForEnterprise,
        inMemoryEnterpriseRepository,
        inMemoryJobsRepository,
        inMemoryApplicantRepository,
    };
};

const prepareData = () => {
    const usersBuilder = UsersBuilder.aUser().withEnterpriseInfo().build();

    const userApplicantBuilder = UsersBuilder.aUser().build();
    const anotherUserApplicantBuilder = UsersBuilder.aUser().withAnotherEmail().build();

    const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userApplicantBuilder.id).build();
    const anotherApplicantBuilder = ApplicantBuilder.aApplicant().withUserId(anotherUserApplicantBuilder.id).build();

    const applicants = [
        { ...applicantBuilder, user: { ...userApplicantBuilder } },
        { ...anotherApplicantBuilder, user: { ...anotherUserApplicantBuilder } },
    ];

    const enterpriseBuilder = EnterpriseBuilder.aEnterprise().withUserId(usersBuilder.id).build();

    const enterpriseData = { ...usersBuilder, ...enterpriseBuilder };

    const jobsBuilder = JobsBuilder.aJob().withEnterpriseId(enterpriseBuilder.id).build();

    return { enterpriseBuilder, enterpriseData, jobsBuilder, applicants };
};

describe("Get One Job For Enterprise", () => {
    it("Should be able to get one job for an enteprise", async () => {
        const { getOneJobForEnterprise, inMemoryEnterpriseRepository, inMemoryJobsRepository } = prepareUseCase();
        const authenticatedId = 1;

        const { jobsBuilder, enterpriseData, enterpriseBuilder, applicants } = prepareData();

        await inMemoryEnterpriseRepository.createAnEnterprise(enterpriseData);
        await inMemoryJobsRepository.createANewJob(jobsBuilder);
        inMemoryEnterpriseRepository.populateJobsWithApplicants({ ...jobsBuilder, applicants: applicants });

        const sut = await getOneJobForEnterprise.perform({
            authenticated_id: authenticatedId,
            enterprise_id: enterpriseBuilder.id,
            job_id: jobsBuilder.id,
        });

        expect(sut.applicants).toHaveLength(2);
    });

    it("Should not be able to get jobs for an invalid enteprise", () => {
        const { getOneJobForEnterprise } = prepareUseCase();
        const invalidEnterpriseId = 0;
        const authenticatedId = 0;
        const jobId = 0;

        expect(async () => {
            await getOneJobForEnterprise.perform({
                authenticated_id: authenticatedId,
                enterprise_id: invalidEnterpriseId,
                job_id: jobId,
            });
        }).rejects.toThrowError("Invalid or inexisting enterprise");
    });

    it("Should not be able to get one job for an unauthorizated enterprise", async () => {
        const { getOneJobForEnterprise, inMemoryEnterpriseRepository } = prepareUseCase();
        const { enterpriseData } = prepareData();

        const invalidAuthenticatedId = 2;
        const randomJobId = 1;

        await inMemoryEnterpriseRepository.createAnEnterprise(enterpriseData);

        expect(async () => {
            await getOneJobForEnterprise.perform({
                authenticated_id: invalidAuthenticatedId,
                enterprise_id: enterpriseData.id,
                job_id: randomJobId,
            });
        });
    });
});
