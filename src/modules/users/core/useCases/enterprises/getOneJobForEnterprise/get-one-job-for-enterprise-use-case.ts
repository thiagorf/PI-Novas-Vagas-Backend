import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";

interface OneJobEnterpriseRequiredInfo {
    enterprise_id: number;
    job_id: number;
    authenticated_id: number;
}

export class GetOneJobForEnterpriseUseCase {
    constructor(private enterpriseRepository: EnterpriseRepository) {}

    async perform({ authenticated_id, enterprise_id, job_id }: OneJobEnterpriseRequiredInfo) {
        const enterpriseExists = await this.enterpriseRepository.getEnterpriseByUserId(authenticated_id);

        if (!enterpriseExists) {
            throw new Error("Invalid or inexisting enterprise");
        }

        const enterprise = await this.enterpriseRepository.getOneJobForEnterprise(enterpriseExists.id, job_id);

        if (enterpriseExists.id != enterprise_id) {
            throw new Error("Unauthorizated User");
        }

        return enterprise;
    }
}
