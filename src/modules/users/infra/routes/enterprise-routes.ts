import { Router } from "express";
import { checkAuthEnterpriseMiddleware } from "../../../../infra/middlewares/check-auth-enterprise-middleware";
import {
    createEnterpriseController,
    enterpriseAuthController,
    getJobsForEnterpriseController
} from "../../core/useCases/enterprises";


const enterpriseRouter = Router();

enterpriseRouter.post("/", createEnterpriseController.handle);
enterpriseRouter.post("/login", enterpriseAuthController.handle)
enterpriseRouter.get("/:id/jobs", checkAuthEnterpriseMiddleware, getJobsForEnterpriseController.handle)

export { enterpriseRouter }