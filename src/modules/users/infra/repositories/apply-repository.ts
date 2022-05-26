import { ApplicantForJobs } from "@prisma/client";
import { Apply } from "../../core/entity/Apply";

export interface ApplyRepository {
    apply(applicant_id: number, jobs_id: number): Promise<Apply>;
    hasAlreadyApplied(applicant_id: number, jobs_id: number): Promise<Apply>;
    giveUp(applicant_id: number, jobs_id: number): Promise<ApplicantForJobs>;
}
