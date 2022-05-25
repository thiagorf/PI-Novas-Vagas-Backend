import { Router } from "express";
import { checkAuthEnterpriseMiddleware } from "../../../../infra/middlewares/check-auth-enterprise-middleware";
import {
    createEnterpriseController,
    enterpriseAuthController,
    getJobsForEnterpriseController,
} from "../../core/useCases/enterprises";

const enterpriseRoutes = Router();

enterpriseRoutes.post("/", createEnterpriseController.handle);
enterpriseRoutes.post("/login", enterpriseAuthController.handle);
enterpriseRoutes.get("/:id/jobs", checkAuthEnterpriseMiddleware, getJobsForEnterpriseController.handle);

export { enterpriseRoutes };
