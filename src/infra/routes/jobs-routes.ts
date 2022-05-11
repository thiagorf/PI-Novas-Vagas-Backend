import { Router } from "express";
import { jobsRouter } from "../../modules/jobs/infra/routes";

const v1Routes = Router();

v1Routes.use("/jobs", jobsRouter);

export { v1Routes }