import { Router } from "express";
import { checkAuthEnterpriseMiddleware } from "../../../../infra/middlewares/check-auth-enterprise-middleware";
import {
    createEnterpriseController,
    getJobsForEnterpriseController,
    getOneEnterpriseController,
} from "../../core/useCases/enterprises";
import { getOneJobForEnterpriseControoler } from "../../core/useCases/enterprises/getOneJobForEnterprise";

const enterpriseRoutes = Router();

enterpriseRoutes.post("/", createEnterpriseController.handle);
enterpriseRoutes.get("/:id/jobs", getJobsForEnterpriseController.handle);
enterpriseRoutes.get("/:id", getOneEnterpriseController.handle);
enterpriseRoutes.get(
    "/:enterprise_id/jobs/:jobs_id",
    checkAuthEnterpriseMiddleware,
    getOneJobForEnterpriseControoler.handle,
);

export { enterpriseRoutes };
