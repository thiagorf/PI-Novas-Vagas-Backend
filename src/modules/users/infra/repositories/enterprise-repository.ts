import { Enterprise } from "../../core/entity/Enterprises";
import { CreateEnterpriseDTO } from "../../core/useCases/enterprises/createEnterprise/create-enterprise-dto";


export interface EnterpriseRepository {
    createAnEnterprise(dto: CreateEnterpriseDTO): Promise<Enterprise>
    getEterpriseBy(cnpj: string): Promise<Enterprise>
}