import { Jobs } from "../../../src/modules/jobs/core/entity/Jobs";
import { Enterprise } from "../../../src/modules/users/core/entity/Enterprises";
import { EnterpriseBuilder } from "./enterprise-builder";

export class JobsBuilder {
    private enterprise: Enterprise = EnterpriseBuilder.aEnterprise().build();

    private jobs: Jobs = {
        id: 0,
        title: "Developer",
        description: "tech lead node.js",
        address: "remote",
        salary: "20000",
        started_at: new Date(),
        ends_at: new Date(),
        enterprise_id: this.enterprise.id,
    };

    public static aJob() {
        return new JobsBuilder();
    }

    public withEnterpriseId(id: number) {
        this.jobs.enterprise_id = id;
        return this;
    }

    public build() {
        return this.jobs;
    }
}
