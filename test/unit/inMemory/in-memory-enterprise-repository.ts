import { Enterprise } from "../../../src/modules/users/core/entity/Enterprises";
import { CreateEnterpriseDTO } from "../../../src/modules/users/core/useCases/enterprises/createEnterprise/create-enterprise-dto";
import { EnterpriseRepository } from "../../../src/modules/users/infra/repositories/enterprise-repository";

export class InMemoryEnterpriseRepository implements EnterpriseRepository {
    private id = 0;
    private enterprise: Enterprise[] = [];

    createAnEnterprise(dto: CreateEnterpriseDTO): Promise<Enterprise> {
        throw new Error("Method not implemented.");
    }
    getEterpriseBy(cnpj: string): Promise<Enterprise> {
        throw new Error("Method not implemented.");
    }
    getEnterpriseByUserId(user_id: number): Promise<Enterprise> {
        throw new Error("Method not implemented.");
    }
    getJobs(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getEnterpriseById(id: number): Promise<Enterprise> {
        throw new Error("Method not implemented.");
    }
    getAllEnterpriseInfo(enterprise_id: number): Promise<Enterprise> {
        throw new Error("Method not implemented.");
    }
    getOneJobForEnterprise(enterprise_id: number, job_id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
