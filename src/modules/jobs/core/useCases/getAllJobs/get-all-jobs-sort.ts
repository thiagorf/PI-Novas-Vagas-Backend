import prisma from "../../../../../infra/database/prisma";
import { JobsRepository } from "../../../infra/repositories/jobs-repository";
import { PossibleQuerys } from "./get-all-jobs-controller";

export class GetAllJobsSort {
    constructor(private jobsRepository: JobsRepository) {}

    async handle(possibleQuerys: PossibleQuerys) {
        let conditions = {};

        if (possibleQuerys.q) {
            conditions = {
                ...conditions,
                title: {
                    contains: possibleQuerys.q,
                    mode: "insensitive",
                },
            };
        }

        if (possibleQuerys.address) {
            conditions = {
                ...conditions,
                address: {
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
