import { Router } from "express"
import { checkAuthMiddleware } from "../../../../infra/middlewares/check-auth-middleware";
import {
    getAllJobsController,
    getOneJobController,
    createJobController,
    deleteJobController,
    updateJobController
} from "../../core/useCases"

const jobsRouter = Router();

jobsRouter.get("/", getAllJobsController.handle);
jobsRouter.get("/:id", getOneJobController.handle);
jobsRouter.post("/", checkAuthMiddleware, createJobController.handle);
jobsRouter.put("/:id", updateJobController.handle);
jobsRouter.delete("/:id", deleteJobController.handle)



export { jobsRouter }