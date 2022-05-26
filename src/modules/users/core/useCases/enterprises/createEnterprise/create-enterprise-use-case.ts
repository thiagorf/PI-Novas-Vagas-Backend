import { hash } from "bcrypt";
import { EnterpriseRepository } from "../../../../infra/repositories/enterprise-repository";
import { CreateEnterpriseDTO } from "./create-enterprise-dto";

export class CreateEnterpriseUseCase {
    constructor(private enterpriseRepository: EnterpriseRepository) {}

    async perform(dto: CreateEnterpriseDTO) {
        //hash password
        const enterpriseExist = await this.enterpriseRepository.getEterpriseBy(dto.cnpj);

        if (enterpriseExist) {
            throw new Error("Enterprise already exists.");
        }

        const hashedPassword = await hash(dto.password, 10);

        const enterprise = await this.enterpriseRepository.createAnEnterprise({ ...dto, password: hashedPassword });

        return enterprise;
    }
}
