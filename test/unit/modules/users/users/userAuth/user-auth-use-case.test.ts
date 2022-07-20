import { UserAuthUseCase } from "../../../../../../src/modules/users/core/useCases/users/userAuth/user-auth-use-case";
import { ApplicantBuilder } from "../../../../builders/applicant-builder";
import { EnterpriseBuilder } from "../../../../builders/enterprise-builder";
import { UsersBuilder } from "../../../../builders/users-builder";
import { InMemoryApplicantRepository } from "../../../../inMemory/in-memory-applicant-repository";
import { InMemoryEnterpriseRepository } from "../../../../inMemory/in-memory-enterprise-repository";
import { InMemoryUserRepository } from "../../../../inMemory/in-memory-user-repository";
import { CryptoStub } from "../../../../services/crypto-stub";
import { JwtAuthStub } from "../../../../services/jwt-auth-stub";

const prepareUseCase = () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryApplicantRepository = new InMemoryApplicantRepository();
    const inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    const jwtServiceStub = new JwtAuthStub();
    const cryptoServiceStub = new CryptoStub();

    const userAuth = new UserAuthUseCase(
        inMemoryUserRepository,
        inMemoryApplicantRepository,
        inMemoryEnterpriseRepository,
        jwtServiceStub,
        cryptoServiceStub,
    );

    return { userAuth, inMemoryUserRepository, inMemoryApplicantRepository, inMemoryEnterpriseRepository };
};

const prepareData = () => {
    const userBuilder = UsersBuilder.aUser().build();
    const userWithEnterpriseInfo = UsersBuilder.aUser().withEnterpriseInfo().build();

    const applicantBuilder = ApplicantBuilder.aApplicant().withUserId(userBuilder.id).build();
    const enterpriseBuilder = EnterpriseBuilder.aEnterprise().withUserId(userWithEnterpriseInfo.id).build();

    //TODO fix hashed password in other parts of the codebase
    const applicantData = { ...userBuilder, ...applicantBuilder };
    const enterpriseData = { ...userWithEnterpriseInfo, ...enterpriseBuilder };

    return { applicantData, enterpriseData, userBuilder, userWithEnterpriseInfo };
};

describe("User Auth", () => {
    it("Should be able to authenticate an user, when is it an applicant", async () => {
        const { userAuth, inMemoryUserRepository, inMemoryApplicantRepository } = prepareUseCase();
        const { applicantData, userBuilder } = prepareData();

        await inMemoryApplicantRepository.createAnApplicant(applicantData);
        inMemoryUserRepository.populateUsers(userBuilder);

        const sut = await userAuth.perform(userBuilder);

        expect(sut).toEqual(userBuilder.id + "ENCRYPTED");
    });
    test.todo("Should be able to authenticate an user, when is it an enterprise");
    test.todo("Should not be able to authenticate an invalid user");
    test.todo("Should not be able to authenticate an user with a wrong password");
});
