import { Jobs } from "../../core/entity/Jobs"
import { JobsRequiredInfo } from "../../types"




export interface JobsRepository {
    getAllJobs(): Promise<Jobs[]>
    getOneJob(jobId: number): Promise<Jobs>
    createANewJob: (jobInfo: JobsRequiredInfo) => Promise<Jobs>
    updateAJob: (jobId: number,jobInfo: JobsRequiredInfo) => Promise<Jobs>
    deleteAJob: (jobId: number) => Promise<Jobs>
}