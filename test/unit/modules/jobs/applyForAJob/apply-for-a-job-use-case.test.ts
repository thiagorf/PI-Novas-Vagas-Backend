import { ApplyForAJobUseCase } from "../../../../../src/modules/jobs/core/useCases/applyforAjob/apply-for-a-job-use-case";
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

    const applyForAJob = new ApplyForAJobUseCase(
        inMemoryApplicantRepository,
        inMemoryJobsRepository,
        inMemoryApplyRepository,
    );

    return { applyForAJob, inMemoryApplicantRepository, inMemoryJobsRepository, inMemoryApplyRepository };
};

const prepareData = () => {
    const userBuilder = UsersBuilder.aUser().build();
    const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userBuilder.id).build();
    const jobsBuilder = JobsBuilder.aJob().build();

    const applicantData = { ...userBuilder, ...applicantBuilder };

    return { applicantData, jobsBuilder };
};

describe("Apply For A Job", () => {
    it("Should be able to apply to a job", async () => {
        const { applyForAJob, inMemoryApplicantRepository, inMemoryJobsRepository } = prepareUseCase();
        const { applicantData, jobsBuilder } = prepareData();

        const applicant = await inMemoryApplicantRepository.createAnApplicant(applicantData);
        const job = await inMemoryJobsRepository.createANewJob(jobsBuilder);

        const sut = await applyForAJob.perform({ jobs_id: job.id, user_id: applicant.user_id });

        expect(sut).toHaveProperty("created_at");
        expect(sut).toHaveProperty("id", 0);
    });

    it("Should not be able to apply to a job with an invalid applicant", () => {
        const { applyForAJob } = prepareUseCase();

        const invalidUserId = 0;
        const randomJobId = 0;

        expect(async () => {
            await applyForAJob.perform({ jobs_id: randomJobId, user_id: invalidUserId });
        }).rejects.toThrowError("Invalid applicant");
    });

    it("Should not be able to apply to a job with an invalid job", async () => {
        const { applyForAJob, inMemoryApplicantRepository } = prepareUseCase();
        const { applicantData } = prepareData();

        const invalidJobId = 0;

        const applicant = await inMemoryApplicantRepository.createAnApplicant(applicantData);

        expect(async () => {
            await applyForAJob.perform({ user_id: applicant.user_id, jobs_id: invalidJobId });
        }).rejects.toThrowError("Invalid job.");
    });

    it("Should not be able to apply to a job that has already been applied", async () => {
        const { applyForAJob, inMemoryApplicantRepository, inMemoryApplyRepository, inMemoryJobsRepository } =
            prepareUseCase();

        const { applicantData, jobsBuilder } = prepareData();

        const applicant = await inMemoryApplicantRepository.createAnApplicant(applicantData);
        const job = await inMemoryJobsRepository.createANewJob(jobsBuilder);

        await inMemoryApplyRepository.apply(applicant.id, job.id);

        expect(async () => {
            await applyForAJob.perform({ jobs_id: job.id, user_id: applicant.user_id });
        }).rejects.toThrowError("User already applied.");
    });
});
