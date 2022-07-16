import { CreateApplicantUseCase } from "../../../../../src/modules/users/core/useCases/applicants/createApplicant/create-applicant-use-case";
import { ApplicantBuilder } from "../../../builders/applicant-builder";
import { UsersBuilder } from "../../../builders/users-builder";
import { InMemoryApplicantRepository } from "../../../inMemory/in-memory-applicant-repository";

const prepareUseCase = () => {
    const inMemoryApplicantRepository = new InMemoryApplicantRepository();
    const createApplicant = new CreateApplicantUseCase(inMemoryApplicantRepository);

    return { createApplicant, inMemoryApplicantRepository };
};

describe("Create Applicant", () => {
    it("Should be able to create an applicant", async () => {
        const { createApplicant } = prepareUseCase();

        const userBuilder = UsersBuilder.aUser().build();
        const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userBuilder.id).build();

        const applicantData = { ...userBuilder, ...applicantBuilder };

        const sut = await createApplicant.perform(applicantData);

        expect(sut).toMatchObject(applicantBuilder);
    });

    it("Should not be able to create an applicant with the same email", async () => {
        const { createApplicant, inMemoryApplicantRepository } = prepareUseCase();

        const userBuilder = UsersBuilder.aUser().build();
        const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userBuilder.id).build();

        const applicantData = { ...userBuilder, ...applicantBuilder };

        await inMemoryApplicantRepository.createAnApplicant(applicantData);

        expect(async () => {
            await createApplicant.perform(applicantData);
        }).rejects.toThrowError("Email invalid or is already been used");
    });
});
