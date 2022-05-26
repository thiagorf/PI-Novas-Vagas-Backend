import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";

export class GetJobsEnterpriseUseCase {
    constructor(private enterpriseRepository: EnterpriseRepository) {}

    async perform(enterprise_id: number, authenticated_id: number) {
        //const enterprise = await this.enterpriseRepository.getEnterpriseById(id);
        const enterprise = await this.enterpriseRepository.getEnterpriseByUserId(authenticated_id);

        if (!enterprise) {
            throw new Error("Invalid or inexisting enterprise");
        }

        if (enterprise.id != enterprise_id) {
            throw new Error("Unauthorized.");
        }

        const enterpriseJobs = await this.enterpriseRepository.getJobs(enterprise.id);

        return enterpriseJobs;
    }
}
