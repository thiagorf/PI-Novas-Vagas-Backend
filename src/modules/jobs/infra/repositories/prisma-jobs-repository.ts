import prisma from "../../../../infra/database/prisma";
import { JobsRequiredInfo, JobsRequiredUpdateInfo } from "../../types";
import { JobsRepository } from "./jobs-repository";

export class PrismaJobsRepository implements JobsRepository {
    //Jobs or Job?
    async getAllJobs() {
        const result = await prisma.jobs.findMany();

        return result;
    }

    async getOneJob(jobId: number) {
        const result = await prisma.jobs.findUnique({
            where: {
                id: jobId,
            },
        });

        return result;
    }

    async createANewJob(jobsData: JobsRequiredInfo) {
        const result = await prisma.jobs.create({
            data: jobsData,
        });

        return result;
    }

    async updateAJob(jobId: number, jobsData: JobsRequiredUpdateInfo) {
        const result = await prisma.jobs.update({
            where: {
                id: jobId,
            },
            data: jobsData,
        });

        return result;
    }

    async deleteAJob(jobId: number) {
        const result = await prisma.jobs.delete({
            where: {
                id: jobId,
            },
        });

        return result;
    }
}
