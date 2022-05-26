import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";

export class GetJobsEnterpriseUseCase {
    constructor(private enterpriseRepository: EnterpriseRepository) {}

    async perform(enterprise_id: number) {
        const enterprise = await this.enterpriseRepository.getEnterpriseById(enterprise_id);

        if (!enterprise) {
            throw new Error("Invalid or inexisting enterprise");
        }

        const enterpriseJobs = await this.enterpriseRepository.getJobs(enterprise.id);

        return enterpriseJobs;
    }
}
