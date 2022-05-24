import { Jobs } from "../../../jobs/core/entity/Jobs"

export interface Applicants {
    id: number 
    photo: String
    curriculum: String
    user_id: number
    jobs?: Jobs[]
}