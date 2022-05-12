import { Router } from "express"
import { createJobController } from "../../core/useCases/createJob";
import { deleteJobController } from "../../core/useCases/deleteJob";
import { getAllJobsController } from "../../core/useCases/getAllJobs";
import { getOneJobController } from "../../core/useCases/getOneJob";
import { updateJobController } from "../../core/useCases/updateJob"

const jobsRouter = Router();

jobsRouter.get("/", getAllJobsController.handle);
jobsRouter.get("/:id", getOneJobController.handle);
jobsRouter.post("/", createJobController.handle);
jobsRouter.put("/:id", updateJobController.handle);
jobsRouter.delete("/:id", deleteJobController.handle)



export { jobsRouter }