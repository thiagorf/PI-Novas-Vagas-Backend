import { Jobs } from "../../../src/modules/jobs/core/entity/Jobs";

export class JobsBuilder {
    private jobs: Jobs = {
        id: 0,
        title: "Developer",
        description: "tech lead node.js",
        address: "remote",
        salary: "20000",
        started_at: new Date(),
        ends_at: new Date(),
        enterprise_id: 0,
    };

    public static aJob() {
        return new JobsBuilder();
    }

    public build() {
        return this.jobs;
    }
}
