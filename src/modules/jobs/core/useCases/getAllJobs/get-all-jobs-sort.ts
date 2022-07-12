import { JobsRepository } from "../../../infra/repositories/jobs-repository";
import { PossibleQuerys } from "./get-all-jobs-controller";
import prisma from "../../../../../infra/database/prisma";

interface PrismaWhereOptions {
    title?: any;
    address?: any;
    salary?: any;
    started_at?: any;
    ends_at?: any;
}

export class GetAllJobsSort {
    constructor(private jobsRepository: JobsRepository) {}

    async handle(possibleQuerys: PossibleQuerys) {
        let conditions: PrismaWhereOptions = {};

        if (possibleQuerys.q) {
            conditions = {
                ...conditions,
                title: {
                    search: possibleQuerys.q,
                },
                address: {
                    search: possibleQuerys.q,
                },
            };
        }

        if (possibleQuerys.address) {
            conditions = {
                ...conditions,
                address: {
                    ...conditions.address,
                    contains: possibleQuerys.address,
                    mode: "insensitive",
                },
            };
        }

        if (possibleQuerys.salary) {
            conditions = {
                ...conditions,
                salary: {
                    contains: possibleQuerys.salary,
                    mode: "insensitive",
                },
            };
        }

        if (possibleQuerys.start_at && possibleQuerys.ends_at) {
            conditions = {
                ...conditions,
                started_at: {
                    gte: possibleQuerys.start_at,
                },
                ends_at: {
                    lte: possibleQuerys.ends_at,
                },
            };
        }

        console.log(conditions);
        const result = await prisma.jobs.findMany({
            where: { ...conditions },
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
        });

        const mapJobs = result.map((jobsInfo) => {
            return { ...jobsInfo, enterprise: jobsInfo.enterprise.user };
        });

        return mapJobs;
    }
}
