import { Router } from "express";
import { applicantRoutes } from "../../modules/users/infra/routes/applicant-routes";

const prefixApplicantsRoutes = Router();

prefixApplicantsRoutes.use("/applicants", applicantRoutes);

export { prefixApplicantsRoutes };
