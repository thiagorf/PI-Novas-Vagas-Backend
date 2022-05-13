import { Router } from "express";
import { jobsRouter } from "../../modules/jobs/infra/routes";
import { applicantRouter } from "../../modules/users/infra/routes/applicant-routes";

const applicantsRoutes = Router();

applicantsRoutes.use("/applicants", applicantRouter);

export { applicantsRoutes }