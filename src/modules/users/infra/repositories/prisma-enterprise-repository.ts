import prisma from "../../../../infra/database/prisma";
import { Enterprise } from "../../core/entity/Enterprises";
import { CreateEnterpriseDTO } from "../../core/useCases/enterprises/createEnterprise/create-enterprise-dto";
import { EnterpriseRepository } from "./enterprise-repository";

export class PrismaEnterpriseRepository implements EnterpriseRepository {
    async createAnEnterprise(dto: CreateEnterpriseDTO): Promise<Enterprise> {
        const { cep, cnpj, email, name, password, segment } = dto;

        const enterprise = await prisma.enterprise.create({
            data: {
                cep,
                cnpj,
                segment,
                user: {
                    create: {
                        email,
                        name,
                        password,
                        type: "enterprise",
                    },
                },
            },
        });

        return enterprise;
    }

    async getEterpriseBy(cnpj: string): Promise<Enterprise> {
        const enterprise = await prisma.enterprise.findFirst({
            where: {
                cnpj,
            },
        });

        return enterprise;
    }

    async getEnterpriseByEmail(email: string): Promise<Enterprise> {
        const enterprise = await prisma.enterprise.findFirst({
            where: {
                user: {
                    email,
                },
            },
        });

        return enterprise;
    }

    async getEnterpriseByUserId(user_id: number) {
        const enterprise = await prisma.enterprise.findFirst({
            where: {
                user_id,
            },
        });

        return enterprise;
    }

    async getEnterpriseById(id: number): Promise<Enterprise> {
        const enterprise = await prisma.enterprise.findUnique({
            where: {
                id,
            },
        });

        return enterprise;
    }

    async getJobs(id: number): Promise<any> {
        const enterpriseJobs = await prisma.enterprise.findUnique({
            where: {
                id,
            },
            include: {
                jobs: {
                    include: {
                        enterprise: {
                            include: {
                                user: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const formated = {
            ...enterpriseJobs,
            jobs: enterpriseJobs.jobs.map((job) => ({
                ...job,
                enterprise: {
                    name: job.enterprise.user.name,
                },
            })),
        };

        return formated;
    }

    async getAllEnterpriseInfo(enterprise_id: number): Promise<Enterprise> {
        const enterprise = await prisma.enterprise.findUnique({
            where: {
                id: enterprise_id,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        type: true,
                    },
                },
            },
        });

        return enterprise;
    }

    async getOneJobForEnterprise(enterprise_id: number, job_id: number): Promise<any> {
        const enterpriseOneJob = await prisma.enterprise.findUnique({
            where: {
                id: enterprise_id,
            },
            include: {
                jobs: {
                    where: {
                        id: job_id,
                    },
                    include: {
                        applicants: {
                            include: {
                                applicant: {
                                    select: {
                                        curriculum: true,
                                        photo: true,
                                        user: {
                                            select: {
                                                id: true,
                                                name: true,
                                                email: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const formatResponse = enterpriseOneJob.jobs.map((job) => ({
            ...job,
            applicants: job.applicants.map((applicant) => ({ ...applicant.applicant })),
        }));

        return formatResponse;
    }
}
