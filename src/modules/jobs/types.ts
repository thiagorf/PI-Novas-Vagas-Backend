export interface JobsRequiredInfo  {
    title: string;
    salary: string;
    address: string;
    description: string;
    enterprise_id: number;
    started_at: Date;
    ends_at: Date
}

export type JobsRequiredUpdateInfo = Omit<JobsRequiredInfo, "enterprise_id">