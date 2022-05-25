import { Router } from "express";
import { jobsRoutes } from "../../modules/jobs/infra/routes";

const prefixJobRoutes = Router();

prefixJobRoutes.use("/jobs", jobsRoutes);

export { prefixJobRoutes };
