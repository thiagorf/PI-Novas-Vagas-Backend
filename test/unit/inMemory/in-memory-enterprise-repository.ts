import { Enterprise, EnterpriseAllJobs, EnterpriseJobs } from "../../../src/modules/users/core/entity/Enterprises";
import { CreateEnterpriseDTO } from "../../../src/modules/users/core/useCases/enterprises/createEnterprise/create-enterprise-dto";
import { EnterpriseRepository } from "../../../src/modules/users/infra/repositories/enterprise-repository";
import { EnterpriseInformation, JobsApplicants } from "../helpers/user-types";

export class InMemoryEnterpriseRepository implements EnterpriseRepository {
    private id = 0;
    private enterprise: EnterpriseInformation[] = [];
    private jobs: EnterpriseJobs[] = [];
    private jobsWithApplicants: JobsApplicants;

    public populateJobs(jobs: EnterpriseJobs) {
        this.jobs.push(jobs);
    }

    public populateJobsWithApplicants(data: JobsApplicants) {
        this.jobsWithApplicants = data;
    }

    async createAnEnterprise(dto: CreateEnterpriseDTO): Promise<Enterprise> {
        const { email, name, password, cep, cnpj, segment } = dto;

        const enterprise: EnterpriseInformation = {
            id: this.id,
            user_id: this.id,
            ...dto,
            user: {
                name,
                email,
                type: "enterprise",
                password,
            },
        };

        const realResponse: Enterprise = { id: this.id, user_id: this.id, cep, segment, cnpj };

        this.id++;

        this.enterprise.push(enterprise);

        return realResponse;
    }

    async getEterpriseBy(cnpj: string): Promise<Enterprise> {
        const enterprise = this.enterprise.find((enterprise) => enterprise.cnpj === cnpj);

        return enterprise;
    }

    async getEnterpriseByUserId(user_id: number): Promise<Enterprise> {
        const enterprise = this.enterprise.find((enterprise) => enterprise.user_id === user_id);

        return enterprise;
    }

    async getJobs(id: number): Promise<EnterpriseAllJobs> {
        const enterprise = this.enterprise.find((enterprise) => enterprise.id === id);

        const { id: enterprise_id, cep, cnpj, segment, user_id } = enterprise;

        const enterpriseJobs: EnterpriseAllJobs = {
            id: enterprise_id,
            cep,
            cnpj,
            segment,
            user_id,
            jobs: this.jobs,
        };

        return enterpriseJobs;
    }

    async getEnterpriseById(id: number): Promise<Enterprise> {
        const enterprise = this.enterprise.find((enterprise) => enterprise.id === id);

        return enterprise;
    }

    async getAllEnterpriseInfo(enterprise_id: number): Promise<Enterprise> {
        const enterprise = this.enterprise.find((enterprise) => enterprise.id === enterprise_id);

        return enterprise;
    }

    // TODO TEST
    async getOneJobForEnterprise(enterprise_id: number, job_id: number): Promise<any> {
        const jobIndex = this.jobs.findIndex((job) => job.id === job_id && enterprise_id === job.enterprise_id);

        return this.jobsWithApplicants;
    }
}
