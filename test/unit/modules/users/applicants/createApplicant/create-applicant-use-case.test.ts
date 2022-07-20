import { CreateApplicantUseCase } from "../../../../../../src/modules/users/core/useCases/applicants/createApplicant/create-applicant-use-case";
import { ApplicantBuilder } from "../../../../builders/applicant-builder";
import { UsersBuilder } from "../../../../builders/users-builder";
import { InMemoryApplicantRepository } from "../../../../inMemory/in-memory-applicant-repository";
import { CryptoStub } from "../../../../services/crypto-stub";

const prepareUseCase = () => {
    const inMemoryApplicantRepository = new InMemoryApplicantRepository();
    const cryptoService = new CryptoStub();
    const createApplicant = new CreateApplicantUseCase(inMemoryApplicantRepository, cryptoService);

    return { createApplicant, inMemoryApplicantRepository };
};

const prepareData = () => {
    const userBuilder = UsersBuilder.aUser().build();
    const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userBuilder.id).build();

    const applicantData = { ...userBuilder, ...applicantBuilder };

    return { applicantData, applicantBuilder };
};

describe("Create Applicant", () => {
    it("Should be able to create an applicant", async () => {
        const { createApplicant } = prepareUseCase();
        const { applicantData, applicantBuilder } = prepareData();

        const sut = await createApplicant.perform(applicantData);

        expect(sut).toMatchObject(applicantBuilder);
    });

    it("Should not be able to create an applicant with the same email", async () => {
        const { createApplicant, inMemoryApplicantRepository } = prepareUseCase();
        const { applicantData } = prepareData();

        await inMemoryApplicantRepository.createAnApplicant(applicantData);

        expect(async () => {
            await createApplicant.perform(applicantData);
        }).rejects.toThrowError("Email invalid or is already been used");
    });
});
