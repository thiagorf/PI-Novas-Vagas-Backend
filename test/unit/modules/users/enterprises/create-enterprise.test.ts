import { CreateEnterpriseUseCase } from "../../../../../src/modules/users/core/useCases/enterprises/createEnterprise/create-enterprise-use-case";
import { EnterpriseBuilder } from "../../../builders/enterprise-builder";
import { UsersBuilder } from "../../../builders/users-builder";
import { InMemoryEnterpriseRepository } from "../../../inMemory/in-memory-enterprise-repository";

const prepareUseCase = () => {
    const inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    const createEnterprise = new CreateEnterpriseUseCase(inMemoryEnterpriseRepository);

    return { createEnterprise };
};

describe("Create Enterprise", () => {
    it("Should be able to create an enterprise", async () => {
        const { createEnterprise } = prepareUseCase();

        const userData = UsersBuilder.aUser().withEnterpriseInfo().build();
        const enterpriseData = EnterpriseBuilder.aEnterprise().build();

        const sut = await createEnterprise.perform({ ...userData, ...enterpriseData });

        expect(sut).toMatchObject(enterpriseData);
    });
});
