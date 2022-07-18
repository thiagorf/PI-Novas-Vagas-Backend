import { GetOneEnterpriseUseCase } from "../../../../../src/modules/users/core/useCases/enterprises/getOneEnterprise/get-one-enterprise-use-case";
import { EnterpriseBuilder } from "../../../builders/enterprise-builder";
import { UsersBuilder } from "../../../builders/users-builder";
import { InMemoryEnterpriseRepository } from "../../../inMemory/in-memory-enterprise-repository";

const prepareUseCase = () => {
    const inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    const getOneEnterprise = new GetOneEnterpriseUseCase(inMemoryEnterpriseRepository);

    return { getOneEnterprise, inMemoryEnterpriseRepository };
};

const prepareData = () => {
    const userBuilder = UsersBuilder.aUser().withEnterpriseInfo().build();
    const enterpriseBuilder = EnterpriseBuilder.aEnterprise().withUserId(userBuilder.id).build();

    const enterpriseData = { ...userBuilder, ...enterpriseBuilder };

    return { enterpriseData, enterpriseBuilder };
};

describe("Get One Enterprise", () => {
    it("Should be able to get one enterprise", async () => {
        const { getOneEnterprise, inMemoryEnterpriseRepository } = prepareUseCase();
        const { enterpriseData, enterpriseBuilder } = prepareData();

        await inMemoryEnterpriseRepository.createAnEnterprise(enterpriseData);

        const sut = await getOneEnterprise.perform(enterpriseBuilder.id);

        expect(sut).toMatchObject(enterpriseBuilder);
    });

    it("Shold not be able to get an enterprise with an invalid id", () => {
        const { getOneEnterprise } = prepareUseCase();
        const invalidEnterpriseId = 0;

        expect(async () => {
            await getOneEnterprise.perform(invalidEnterpriseId);
        }).rejects.toThrowError("Invalid or inexisting enterprise");
    });
});
