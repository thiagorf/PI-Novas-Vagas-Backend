import { JobsApplicants } from "../../../../../test/unit/helpers/user-types";
import { Enterprise, EnterpriseAllJobs } from "../../core/entity/Enterprises";
import { CreateEnterpriseDTO } from "../../core/useCases/enterprises/createEnterprise/create-enterprise-dto";

export interface EnterpriseRepository {
    createAnEnterprise(dto: CreateEnterpriseDTO): Promise<Enterprise>;
    getEterpriseBy(cnpj: string): Promise<Enterprise>;
    getEnterpriseByUserId(user_id: number): Promise<Enterprise>;
    getJobs(id: number): Promise<EnterpriseAllJobs>;
    getEnterpriseById(id: number): Promise<Enterprise>;
    getAllEnterpriseInfo(enterprise_id: number): Promise<Enterprise>;
    getOneJobForEnterprise(enterprise_id: number, job_id: number): Promise<JobsApplicants>;
}
