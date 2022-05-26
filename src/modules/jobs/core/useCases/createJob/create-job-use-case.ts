import { EnterpriseRepository } from "../../../../users/infra/repositories/enterprise-repository";
import { JobsRepository } from "../../../infra/repositories/jobs-repository";
import { CreateJobDTO } from "./create-job-dto";

export class CreateJobUseCase {
    constructor(private jobRepository: JobsRepository, private enterpriseRepository: EnterpriseRepository) {}

    async perform(jobsData: CreateJobDTO) {
        const enterprise = await this.enterpriseRepository.getEnterpriseByUserId(jobsData.user_id);

        if (!enterprise) {
            throw new Error("Invalid enterprise");
        }
        const { title, address, description, ends_at, salary, started_at } = jobsData;

        const result = await this.jobRepository.createANewJob({
            title,
            address,
            description,
            ends_at,
            salary,
            started_at,
            enterprise_id: enterprise.id,
        });

        return result;
    }
}
