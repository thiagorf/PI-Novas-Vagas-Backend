import prisma from "../../../../infra/database/prisma";
import { Enterprise } from "../../core/entity/Enterprises";
import { CreateEnterpriseDTO } from "../../core/useCases/enterprises/createEnterprise/create-enterprise-dto";
import { EnterpriseRepository } from "./enterprise-repository";



export class PrismaEnterpriseRepository implements EnterpriseRepository {
    async createAnEnterprise(dto: CreateEnterpriseDTO): Promise<Enterprise> {
        const {
            cep,
            cnpj,
            email,
            name,
            password,
            segment
        } = dto;

        const enterprise = await prisma.enterprise.create({
            data: {
                cep,
                cnpj,
                segment,
                user: {
                    create: {
                        email,
                        name,
                        password
                    }
                }
            }
        });

        return enterprise;
    }

    async getEterpriseBy(cnpj: string): Promise<Enterprise> {
        const enterprise = await prisma.enterprise.findFirst({
            where: {
                cnpj
            }
        });

        return enterprise;
    }

    async getEnterpriseByEmail(email: string): Promise<Enterprise> {
        const enterprise = await prisma.enterprise.findFirst({
            where: {
                user: {
                    email
                }
            }
        });

        return enterprise;
    }
}