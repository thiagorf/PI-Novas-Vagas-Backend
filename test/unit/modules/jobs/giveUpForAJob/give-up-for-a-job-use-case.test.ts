import { GiveUpForAJobUseCase } from "../../../../../src/modules/jobs/core/useCases/giveUpForAJob/give-up-for-a-job-use-case";
import { ApplicantBuilder } from "../../../builders/applicant-builder";
import { JobsBuilder } from "../../../builders/jobs-builder";
import { UsersBuilder } from "../../../builders/users-builder";
import { InMemoryApplicantRepository } from "../../../inMemory/in-memory-applicant-repository";
import { InMemoryApplyRepository } from "../../../inMemory/in-memory-apply-repository";
import { InMemoryJobsRepository } from "../../../inMemory/in-memory-jobs-repository";

const prepareUseCase = () => {
    const inMemoryApplicantRepository = new InMemoryApplicantRepository();
    const inMemoryJobsRepository = new InMemoryJobsRepository();
    const inMemoryApplyRepository = new InMemoryApplyRepository();

    const giveUpForAJob = new GiveUpForAJobUseCase(
        inMemoryJobsRepository,
        inMemoryApplicantRepository,
        inMemoryApplyRepository,
    );

    return { giveUpForAJob, inMemoryApplicantRepository, inMemoryJobsRepository, inMemoryApplyRepository };
};

const prepareData = () => {
    const userBuilder = UsersBuilder.aUser().build();
    const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userBuilder.id).build();
    const jobsBuilder = JobsBuilder.aJob().build();

    const applicantData = { ...userBuilder, ...applicantBuilder };

    return { applicantData, jobsBuilder };
};

describe("Give Up For A Job", () => {
    it("Should be able to give up for a job", async () => {
        const { giveUpForAJob, inMemoryApplicantRepository, inMemoryJobsRepository, inMemoryApplyRepository } =
            prepareUseCase();
        const { applicantData, jobsBuilder } = prepareData();

        const applicant = await inMemoryApplicantRepository.createAnApplicant(applicantData);
        const job = await inMemoryJobsRepository.createANewJob(jobsBuilder);

        await inMemoryApplyRepository.apply(applicant.id, job.id);

        const sut = await giveUpForAJob.perform({ jobs_id: job.id, user_id: applicant.user_id });

        expect(sut).toHaveProperty("created_at");
        expect(sut).toHaveProperty("id", 1);
    });

    it("Should not be able to give up with an invalid user", () => {
        const { giveUpForAJob } = prepareUseCase();
        const invalidUserId = 0;
        const randomJobId = 0;

        expect(async () => {
            await giveUpForAJob.perform({ user_id: invalidUserId, jobs_id: randomJobId });
        }).rejects.toThrowError("Invalid applicant");
    });

    it("Should not be able to give up with a invalid job", async () => {
        const { giveUpForAJob, inMemoryApplicantRepository, inMemoryJobsRepository, inMemoryApplyRepository } =
            prepareUseCase();
        const { applicantData, jobsBuilder } = prepareData();
        const invalidJobId = 1;

        const applicant = await inMemoryApplicantRepository.createAnApplicant(applicantData);

        expect(async () => {
            await giveUpForAJob.perform({ jobs_id: invalidJobId, user_id: applicant.user_id });
        }).rejects.toThrowError("Invalid job.");
    });

    it("Should not be able to give up a job that is not applied", async () => {
        const { giveUpForAJob, inMemoryApplicantRepository, inMemoryJobsRepository } = prepareUseCase();
        const { applicantData, jobsBuilder } = prepareData();

        const applicant = await inMemoryApplicantRepository.createAnApplicant(applicantData);
        const job = await inMemoryJobsRepository.createANewJob(jobsBuilder);

        expect(async () => {
            await giveUpForAJob.perform({ jobs_id: job.id, user_id: applicant.user_id });
        }).rejects.toThrowError("Invalid applicant");
    });
});
