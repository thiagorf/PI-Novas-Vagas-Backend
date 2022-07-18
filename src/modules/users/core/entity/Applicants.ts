import { Jobs } from "../../../jobs/core/entity/Jobs";

export interface Applicants {
    id: number;
    photo: string;
    curriculum: string;
    user_id: number;
    jobs?: Jobs[];
}

export type ApplicantJobs = Jobs & {
    enterprise: {
        name: string;
    };
};

export interface ApplicantAllJobs {
    id: number;
    name: string;
    email: string;
    jobs: ApplicantJobs[];
}
