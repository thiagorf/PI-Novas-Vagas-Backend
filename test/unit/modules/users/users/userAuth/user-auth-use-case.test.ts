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

        await inMemoryApplicantRepository.createAnApplicant({
            ...applicantData,
            password: applicantData.password + "HASH",
        });
        inMemoryUserRepository.populateUsers({ ...userBuilder, password: userBuilder.password + "HASH" });

        const sut = await userAuth.perform(userBuilder);

        expect(sut.user).toMatchObject({ ...userBuilder, password: userBuilder.password + "HASH" });
        expect(sut.token).toMatch(userBuilder.id + "ENCRYPTED");
        expect(sut.user.type).toMatch("applicant");
    });

    it("Should be able to authenticate an user, when is it an enterprise", async () => {
        const { userAuth, inMemoryUserRepository, inMemoryEnterpriseRepository } = prepareUseCase();
        const { enterpriseData, userWithEnterpriseInfo } = prepareData();

        await inMemoryEnterpriseRepository.createAnEnterprise({
            ...enterpriseData,
            password: enterpriseData.password + "HASH",
        });
        inMemoryUserRepository.populateUsers({
            ...userWithEnterpriseInfo,
            password: userWithEnterpriseInfo.password + "HASH",
        });

        const sut = await userAuth.perform(userWithEnterpriseInfo);

        expect(sut.user).toMatchObject({
            ...userWithEnterpriseInfo,
            password: userWithEnterpriseInfo.password + "HASH",
        });
        expect(sut.token).toMatch(userWithEnterpriseInfo.id + "ENCRYPTED");
        expect(sut.user.type).toMatch("enterprise");
    });

    it("Should not be able to authenticate an invalid user", () => {
        const { userAuth } = prepareUseCase();
        const inexistingUserInfo = {
            email: "randomemail@gmail.com",
            password: "randompassword",
        };

        expect(async () => {
            await userAuth.perform(inexistingUserInfo);
        }).rejects.toThrowError("Invalid or inexisting user");
    });

    it("Should not be able to authenticate an user with a wrong password", async () => {
        const { userAuth, inMemoryUserRepository, inMemoryApplicantRepository } = prepareUseCase();
        const { applicantData, userBuilder } = prepareData();

        await inMemoryApplicantRepository.createAnApplicant({
            ...applicantData,
            password: applicantData.password + "HASH",
        });
        inMemoryUserRepository.populateUsers(userBuilder);

        expect(async () => {
            await userAuth.perform(userBuilder);
        }).rejects.toThrowError("Invalid email or password.");
    });
});
