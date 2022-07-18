import { ApplicantForJobs } from "@prisma/client";
import prisma from "../../../../infra/database/prisma";
import { Apply } from "../../core/entity/Apply";
import { ApplyRepository } from "./apply-repository";

export class PrismaApplyRepository implements ApplyRepository {
    async apply(applicant_id: number, jobs_id: number) {
        const apply = await prisma.applicantForJobs.create({
            data: {
                applicant_id,
                jobs_id,
            },
        });

        return apply;
    }

    async hasAlreadyApplied(applicant_id: number, jobs_id: number): Promise<ApplicantForJobs> {
        const hasApplied = await prisma.applicantForJobs.findFirst({
            where: {
                jobs_id,
                applicant_id,
            },
        });

        return hasApplied;
    }

    async giveUp(applicant_id: number, number_id: number): Promise<Apply> {
        const applyLink = await this.hasAlreadyApplied(applicant_id, number_id);

        const giveUp = await prisma.applicantForJobs.delete({
            where: {
                id: applyLink.id,
            },
        });

        return giveUp;
    }
}
