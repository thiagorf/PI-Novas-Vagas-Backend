import { Router } from "express";
import {
    createEnterpriseController,
    enterpriseAuthController,
    getJobsForEnterpriseController,
    getOneEnterpriseController,
} from "../../core/useCases/enterprises";

const enterpriseRoutes = Router();

enterpriseRoutes.post("/", createEnterpriseController.handle);
enterpriseRoutes.post("/login", enterpriseAuthController.handle);
enterpriseRoutes.get("/:id/jobs", getJobsForEnterpriseController.handle);
enterpriseRoutes.get("/:id", getOneEnterpriseController.handle);

export { enterpriseRoutes };
