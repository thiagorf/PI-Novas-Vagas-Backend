export interface CreateJobDTO {
    title: string;
    salary: string;
    address: string;
    description: string;
    user_id: number;
    started_at: Date;
    ends_at: Date;
}
