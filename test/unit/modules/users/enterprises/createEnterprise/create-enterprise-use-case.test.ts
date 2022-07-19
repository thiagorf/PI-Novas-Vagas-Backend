import { CreateEnterpriseUseCase } from "../../../../../../src/modules/users/core/useCases/enterprises/createEnterprise/create-enterprise-use-case";
import { EnterpriseBuilder } from "../../../../builders/enterprise-builder";
import { UsersBuilder } from "../../../../builders/users-builder";
import { InMemoryEnterpriseRepository } from "../../../../inMemory/in-memory-enterprise-repository";

const prepareUseCase = () => {
    const inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    const createEnterprise = new CreateEnterpriseUseCase(inMemoryEnterpriseRepository);

    return { createEnterprise, inMemoryEnterpriseRepository };
};

const prepareData = () => {
    const userBuilder = UsersBuilder.aUser().withEnterpriseInfo().build();
    const enterpriseBuilder = EnterpriseBuilder.aEnterprise().withUserId(userBuilder.id).build();

    const enterpriseData = { ...userBuilder, ...enterpriseBuilder };

    return { enterpriseData };
};

describe("Create Enterprise", () => {
    it("Should be able to create an enterprise", async () => {
        const { createEnterprise } = prepareUseCase();
        const { enterpriseData } = prepareData();
        const { id, cep, cnpj, user_id, segment } = enterpriseData;

        const sut = await createEnterprise.perform(enterpriseData);

        expect(sut).toMatchObject({ id, cep, cnpj, user_id, segment });
    });

    it("Should not be able to create an enterprise with a existing cnpj", async () => {
        const { createEnterprise, inMemoryEnterpriseRepository } = prepareUseCase();
        const { enterpriseData } = prepareData();

        await inMemoryEnterpriseRepository.createAnEnterprise(enterpriseData);

        expect(async () => {
            await createEnterprise.perform(enterpriseData);
        }).rejects.toThrowError("Enterprise already exists.");
    });
});
