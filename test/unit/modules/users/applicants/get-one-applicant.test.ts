import { GetOneApplicantUseCase } from "../../../../../src/modules/users/core/useCases/applicants/getOneApplicant/get-one-applicant-use-case";
import { ApplicantBuilder } from "../../../builders/applicant-builder";
import { UsersBuilder } from "../../../builders/users-builder";
import { InMemoryApplicantRepository } from "../../../inMemory/in-memory-applicant-repository";

const prepareUseCase = () => {
    const inMemoryApplicantRepository = new InMemoryApplicantRepository();
    const getOneApplicant = new GetOneApplicantUseCase(inMemoryApplicantRepository);

    return { getOneApplicant, inMemoryApplicantRepository };
};

describe("Get One Applicant", () => {
    it("Should be able to get one applicant", async () => {
        const { getOneApplicant, inMemoryApplicantRepository } = prepareUseCase();

        const userBuilder = UsersBuilder.aUser().build();
        const applicantBuilder = ApplicantBuilder.aApplicant().build();

        const applicantData = { ...userBuilder, ...applicantBuilder };

        const applicant = await inMemoryApplicantRepository.createAnApplicant(applicantData);

        const sut = await getOneApplicant.perform(applicant.id);

        expect(sut).toMatchObject(applicantBuilder);
    });
});
