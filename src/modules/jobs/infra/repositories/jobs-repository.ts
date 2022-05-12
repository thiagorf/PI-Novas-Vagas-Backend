import { Jobs } from "../../core/entity/Jobs"
import { JobsRequiredInfo, JobsRequiredUpdateInfo } from "../../types"

export interface JobsRepository {
    getAllJobs(): Promise<Jobs[]>
    getOneJob(jobId: number): Promise<Jobs>
    createANewJob: (jobInfo: JobsRequiredInfo) => Promise<Jobs>
    updateAJob: (jobId: number,jobInfo: JobsRequiredUpdateInfo) => Promise<Jobs>
    deleteAJob: (jobId: number) => Promise<Jobs>
}