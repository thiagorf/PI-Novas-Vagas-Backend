import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";

export class GetOneEnterpriseUseCase {
    constructor(private enterpriseRepository: EnterpriseRepository) {}

    async perform(enterprise_id: number) {
        const enterprise = await this.enterpriseRepository.getAllEnterpriseInfo(enterprise_id);

        if (!enterprise) {
            throw new Error("Invalid or inexisting enterprise");
        }

        return enterprise;
    }
}
