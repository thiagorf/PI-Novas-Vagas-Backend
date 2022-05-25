import { Router } from "express";
import { checkAuthEnterpriseMiddleware } from "../../../../infra/middlewares/check-auth-enterprise-middleware";
import { checkAuthMiddleware } from "../../../../infra/middlewares/check-auth-middleware";
import {
    getAllJobsController,
    getOneJobController,
    createJobController,
    deleteJobController,
    updateJobController,
    applyForAJobController,
    giveUpForAJobController,
} from "../../core/useCases";

const jobsRoutes = Router();

jobsRoutes.get("/", getAllJobsController.handle);
jobsRoutes.get("/:id", getOneJobController.handle);
jobsRoutes.post("/", checkAuthEnterpriseMiddleware, createJobController.handle);
jobsRoutes.put("/:id", checkAuthEnterpriseMiddleware, updateJobController.handle);
jobsRoutes.delete("/:id", deleteJobController.handle);
jobsRoutes.post("/:id/apply", checkAuthMiddleware, applyForAJobController.handle);
jobsRoutes.post("/:id/give-up", checkAuthMiddleware, giveUpForAJobController.handle);

export { jobsRoutes };
