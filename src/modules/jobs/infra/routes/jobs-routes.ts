import { Router } from "express"
import { getAllJobsController, getOneJobController, createJobController, updateJobController, deleteJobController } from "../../abstractions/controllers";

const jobsRouter = Router();

jobsRouter.get("/", getAllJobsController.handle);
jobsRouter.get("/:id", getOneJobController.handle);
jobsRouter.post("/", createJobController.handle);
jobsRouter.put("/:id", updateJobController.handle);
jobsRouter.delete("/:id", deleteJobController.handle)



export { jobsRouter }