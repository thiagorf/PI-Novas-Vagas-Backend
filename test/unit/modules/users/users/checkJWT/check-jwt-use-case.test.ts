import { CheckJwtUseCase } from "../../../../../../src/modules/users/core/useCases/users/checkJWT/check-jwt-use-case";
import { UsersBuilder } from "../../../../builders/users-builder";
import { InMemoryUserRepository } from "../../../../inMemory/in-memory-user-repository";
import { JwtAuthStub } from "../../../../services/jwt-auth-stub";

const prepareUseCase = () => {
    const jwtService = new JwtAuthStub();
    const inMemoryUserRepository = new InMemoryUserRepository();
    const checkJwt = new CheckJwtUseCase(jwtService, inMemoryUserRepository);

    return { checkJwt, inMemoryUserRepository, jwtService };
};

const prepareData = () => {
    const userBuilder = UsersBuilder.aUser().build();

    return { userBuilder };
};

describe("Check JWT", () => {
    it("Should be able to check jwt", async () => {
        const { checkJwt, inMemoryUserRepository, jwtService } = prepareUseCase();
        const { userBuilder } = prepareData();

        inMemoryUserRepository.populateUsers(userBuilder);
        const token = jwtService.encode({ sub: userBuilder.id });

        const sut = await checkJwt.perform(token);

        expect(sut.ok).toBeTruthy();
    });

    it("Should not be able to check a empty token", async () => {
        const { checkJwt } = prepareUseCase();
        const invalidToken = undefined;

        const sut = await checkJwt.perform(invalidToken);

        expect(sut.ok).toBeFalsy();
    });

    it("Should not be able to pass an invalid token", async () => {
        const { checkJwt, inMemoryUserRepository } = prepareUseCase();
        const { userBuilder } = prepareData();

        inMemoryUserRepository.populateUsers(userBuilder);

        const sut = await checkJwt.perform("randomstring");

        expect(sut.ok).toBeFalsy();
    });

    it("Should not be able to pass a token with a inexisting user", async () => {
        const { checkJwt, jwtService } = prepareUseCase();
        const invalidUserId = 1;

        const token = jwtService.encode({ sub: invalidUserId });

        const sut = await checkJwt.perform(token);

        expect(sut.ok).toBeFalsy();
    });
});
