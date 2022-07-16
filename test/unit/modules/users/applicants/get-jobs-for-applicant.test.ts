import { GetJobsForApplicantUseCase } from "../../../../../src/modules/users/core/useCases/applicants/getJobsForApplicant/get-jobs-for-applicant-use-case";
import { InMemoryApplicantRepository } from "../../../inMemory/in-memory-applicant-repository";

const prepareUseCase = () => {
    const inMemoryApplicantRepository = new InMemoryApplicantRepository();
    const getJobsForApplicant = new GetJobsForApplicantUseCase(inMemoryApplicantRepository);
};

describe("Get Jobs For Applicant", () => {
    it("Should be able to get jobs for an applicant", () => {});
});
