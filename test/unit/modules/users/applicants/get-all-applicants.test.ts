import { GetApllicantsUseCase } from "../../../../../src/modules/users/core/useCases/applicants/getAllApplicants/get-all-apllicants-use-case";
import { ApplicantBuilder } from "../../../builders/applicant-builder";
import { UsersBuilder } from "../../../builders/users-builder";
import { InMemoryApplicantRepository } from "../../../inMemory/in-memory-applicant-repository";

const prepareUseCase = () => {
    const inMemoryApplicantRepository = new InMemoryApplicantRepository();
    const getAllApllicants = new GetApllicantsUseCase(inMemoryApplicantRepository);

    return { getAllApllicants, inMemoryApplicantRepository };
};

describe("Get All Aplicants", () => {
    it("Should be able to get all aplicants", async () => {
        const { getAllApllicants, inMemoryApplicantRepository } = prepareUseCase();

        const userBuilder = UsersBuilder.aUser().build();
        const userWithAnotherEmail = UsersBuilder.aUser().withAnotherEmail().build();

        const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userBuilder.id).build();
        const anotherApplicant = ApplicantBuilder.aApplicant().withUserId(userWithAnotherEmail.id).build();

        const applicantData = { ...userBuilder, ...applicantBuilder };
        const anotherApplicantData = { ...userWithAnotherEmail, ...anotherApplicant };

        await inMemoryApplicantRepository.createAnApplicant(applicantData);
        await inMemoryApplicantRepository.createAnApplicant(anotherApplicantData);

        const sut = await getAllApllicants.perform();

        expect(sut).toHaveLength(2);
        expect(sut).toMatchObject([applicantBuilder, anotherApplicant]);
    });
});
