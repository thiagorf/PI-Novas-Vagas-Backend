import prisma from "../../../../infra/database/prisma";
import { Apply } from "../../core/entity/Apply";
import { ApplyRepository } from "./apply-repository";



export class PrismaApplyRepository implements ApplyRepository {
    async apply(applicant_id: number, jobs_id: number) {
        const apply = await prisma.applicantForJobs.create({
            data: {
                applicant_id,
                jobs_id
            }
        });

        return apply;
    }

    async hasAlreadyApplied(applicant_id: number, jobs_id: number): Promise<Apply> {
        const hasApplied = await prisma.applicantForJobs.findFirst({
            where: {
                jobs_id,
                applicant_id
            }
        });

        return hasApplied
    }

    async giveUp(applicant_id: number, jobs_id: number) {

        //const giveUpJob = await prisma.applicantForJobs.update

        //todo
        return null;
        //return giveUpJob;
    }

    async getJobsForAnApplicant(applicant_id: number, ) {
        const applicant = await prisma.applicantForJobs.findFirst({
            where: {
                applicant_id
            },
            select: {
                applicant: true,
                jobs: true,
            }
        });

        return applicant
    }
}