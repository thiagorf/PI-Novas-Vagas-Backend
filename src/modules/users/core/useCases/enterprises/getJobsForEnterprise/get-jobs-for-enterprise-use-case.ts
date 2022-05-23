import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";

export class GetJobsEnterpriseUseCase {

    constructor(
        private enterpriseRepository: EnterpriseRepository
    ) {}

    async perform(id: number) {
        const enterprise = await this.enterpriseRepository.getEnterpriseById(id);

        if(!enterprise) {
            throw new Error("Invalid or inexisting enterprise")
        }

        const enterpriseJobs = await this.enterpriseRepository.getJobs(id);

        return enterpriseJobs;
    }
}