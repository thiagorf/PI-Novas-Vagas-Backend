import { Applicant, Jobs } from "@prisma/client";
import prisma from "../../../../infra/database/prisma";
import { ApplicantAllJobs } from "../../core/entity/Applicants";
import { CreateApplicantDTO } from "../../core/useCases/applicants/createApplicant/create-applicant-dto";
import { ApplicantRepository } from "./applicant-repository";

export type MapJobs = {
    jobs: Jobs[];
    id: number;
    photo: string;
    curriculum: string;
    user_id: number;
};

export class PrismaApplicantRepository implements ApplicantRepository {
    async createAnApplicant(applicantData: CreateApplicantDTO): Promise<Applicant> {
        const { curriculum, email, name, password, photo } = applicantData;

        const applicant = await prisma.applicant.create({
            data: {
                curriculum,
                photo,
                user: {
                    create: {
                        name,
                        email,
                        password,
                    },
                },
            },
        });

        return applicant;
    }

    async getApplicantBy(email: string): Promise<Applicant> {
        const applicant = await prisma.applicant.findFirst({
            where: {
                user: {
                    email,
                },
            },
        });

        return applicant;
    }

    async getAllApllicants(): Promise<Applicant[]> {
        const applicants = await prisma.applicant.findMany();

        return applicants;
    }

    async getApplicantByUserId(user_id: number) {
        const applicant = await prisma.applicant.findFirst({
            where: {
                user_id,
            },
        });

        return applicant;
    }

    /* eslint-disable */
    async getApplicantJobs(user_id: number): Promise<ApplicantAllJobs> {
        const applicantsJobs = await prisma.applicant.findUnique({
            where: {
                user_id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                jobs: {
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
                },
            },
        });

        const jobs = applicantsJobs.jobs.map((job) => ({
            ...job.jobs,
            enterprise: { name: job.jobs.enterprise.user.name },
        }));

        const mapJobs = { ...applicantsJobs.user, jobs: jobs };

        return mapJobs;
    }
    /* eslint-enable */

    async getApplicantById(applicant_id: number): Promise<Applicant> {
        const applicant = await prisma.applicant.findUnique({
            where: {
                id: applicant_id,
            },
        });

        return applicant;
    }

    async getAllApplicantInfo(applicant_id: number): Promise<Applicant> {
        const applicant = await prisma.applicant.findUnique({
            where: {
                id: applicant_id,
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

        return applicant;
    }
}
