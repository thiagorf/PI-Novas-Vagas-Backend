import { GetJobsForApplicantUseCase } from "../../../../../src/modules/users/core/useCases/applicants/getJobsForApplicant/get-jobs-for-applicant-use-case";
import { ApplicantBuilder } from "../../../builders/applicant-builder";
import { JobsBuilder } from "../../../builders/jobs-builder";
import { UsersBuilder } from "../../../builders/users-builder";
import { InMemoryApplicantRepository } from "../../../inMemory/in-memory-applicant-repository";
import { InMemoryApplyRepository } from "../../../inMemory/in-memory-apply-repository";
import { InMemoryJobsRepository } from "../../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const inMemoryApplicantRepository = new InMemoryApplicantRepository();
    const inMemoryApplyRepository = new InMemoryApplyRepository();
    const getJobsForApplicant = new GetJobsForApplicantUseCase(inMemoryApplicantRepository, inMemoryApplyRepository);

    return { getJobsForApplicant, inMemoryApplicantRepository, inMemoryApplyRepository, inMemoryJobsRepository };
};

describe("Get Jobs For Applicant", () => {
    it("Should be able to get jobs for an applicant", async () => {
        const { getJobsForApplicant, inMemoryJobsRepository, inMemoryApplyRepository, inMemoryApplicantRepository } =
            prepareUseCase();

        const userBuilder = UsersBuilder.aUser().withEnterpriseInfo().build();
        const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userBuilder.id).build();
        const jobsBuilder = JobsBuilder.aJob().build();

        const applicant = await inMemoryApplicantRepository.createAnApplicant({ ...userBuilder, ...applicantBuilder });
        const job = await inMemoryJobsRepository.createANewJob(jobsBuilder);

        inMemoryApplicantRepository.populateJobs({
            ...job,
            enterprise: {
                name: "SoftwareX",
            },
        });

        await inMemoryApplyRepository.apply(applicant.id, job.id);

        //Hard code authenticated id
        const sut = await getJobsForApplicant.perform(applicant.id, 0);

        expect(sut.jobs).toHaveLength(1);
    });

    it("Should not be able to get jobs for an inexisting applicant", () => {
        const { getJobsForApplicant } = prepareUseCase();

        const invalidApplicantId = 1;
        const authenticatedId = 0;

        expect(async () => {
            await getJobsForApplicant.perform(invalidApplicantId, authenticatedId);
        }).rejects.toThrowError("Invalid applicant.");
    });

    it("Should not be able to get jobs for an unauthorized user", async () => {
        const { getJobsForApplicant, inMemoryJobsRepository, inMemoryApplyRepository, inMemoryApplicantRepository } =
            prepareUseCase();

        const userBuilder = UsersBuilder.aUser().withEnterpriseInfo().build();
        const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userBuilder.id).build();
        const jobsBuilder = JobsBuilder.aJob().build();

        const applicant = await inMemoryApplicantRepository.createAnApplicant({ ...userBuilder, ...applicantBuilder });
        const job = await inMemoryJobsRepository.createANewJob(jobsBuilder);

        inMemoryApplicantRepository.populateJobs({
            ...job,
            enterprise: {
                name: "SoftwareX",
            },
        });

        await inMemoryApplyRepository.apply(applicant.id, job.id);

        const invalidApplicantId = 1;
        const authenticatedId = 0;
        //Hard code applicant id
        expect(async () => {
            await getJobsForApplicant.perform(invalidApplicantId, authenticatedId);
        }).rejects.toThrowError("unauthorized.");
    });
});
