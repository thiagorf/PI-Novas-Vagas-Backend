import { Router } from "express";
import { jobsRouter } from "../../modules/jobs/infra/routes";

const jobRoutes = Router();

jobRoutes.use("/jobs", jobsRouter);

export { jobRoutes }