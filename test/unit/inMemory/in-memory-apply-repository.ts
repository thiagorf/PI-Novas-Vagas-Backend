import { ApplicantForJobs } from "@prisma/client";
import { Jobs } from "../../../src/modules/jobs/core/entity/Jobs";
import { Apply } from "../../../src/modules/users/core/entity/Apply";
import { ApplyRepository } from "../../../src/modules/users/infra/repositories/apply-repository";

export class InMemoryApplyRepository implements ApplyRepository {
    private id = 0;
    private applies: Apply[] = [];
    private jobs: Jobs[] = [];

    public populateJobs(jobs: Jobs[]) {
        this.jobs.push(...jobs);
    }

    async apply(applicant_id: number, jobs_id: number): Promise<Apply> {
        const newApply = {
            id: this.id,
            applicant_id,
            jobs_id,
            created_at: new Date(),
        };

        const apply = this.applies.push(newApply);

        return newApply;
    }

    async hasAlreadyApplied(applicant_id: number, jobs_id: number): Promise<Apply> {
        const applied = this.applies.find((apply) => apply.applicant_id === applicant_id && apply.jobs_id === jobs_id);

        return applied;
    }

    async giveUp(applicant_id: number, jobs_id: number): Promise<Apply> {
        const applyIndex = this.applies.findIndex(
            (apply) => apply.applicant_id === applicant_id && apply.jobs_id === jobs_id,
        );

        const giveUpApply = this.applies.splice(applyIndex, 1);

        return giveUpApply[0];
    }
}
