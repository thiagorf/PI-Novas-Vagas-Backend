import { Router } from "express"
import { checkAuthEnterpriseMiddleware } from "../../../../infra/middlewares/check-auth-enterprise-middleware";
import { checkAuthMiddleware } from "../../../../infra/middlewares/check-auth-middleware";
import {
    getAllJobsController,
    getOneJobController,
    createJobController,
    deleteJobController,
    updateJobController,
    applyForAJobController,
    giveUpForAJobController
} from "../../core/useCases"

const jobsRouter = Router();

jobsRouter.get("/", getAllJobsController.handle);
jobsRouter.get("/:id", getOneJobController.handle);
jobsRouter.post("/", checkAuthEnterpriseMiddleware, createJobController.handle);
jobsRouter.put("/:id", checkAuthEnterpriseMiddleware, updateJobController.handle);
jobsRouter.delete("/:id", deleteJobController.handle)
jobsRouter.post("/:id/apply", checkAuthMiddleware, applyForAJobController.handle)
jobsRouter.post("/:id/give-up", checkAuthMiddleware, giveUpForAJobController.handle)



export { jobsRouter }