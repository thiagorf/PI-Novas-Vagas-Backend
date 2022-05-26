import { Jobs } from "../../../jobs/core/entity/Jobs";

export interface Applicants {
    id: number;
    photo: string;
    curriculum: string;
    user_id: number;
    jobs?: Jobs[];
}
