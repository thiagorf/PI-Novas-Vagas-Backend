import { Router } from "express";
import { checkAuthMiddleware } from "../../../../infra/middlewares/check-auth-middleware";
import {
    createApplicantController,
    getAllApplicantsController,
    getJobsForApplicantController,
} from "../../core/useCases/applicants";

const applicantRoutes = Router();

applicantRoutes.post("/", createApplicantController.handle);
applicantRoutes.get("/", getAllApplicantsController.handle);
applicantRoutes.get("/:id/jobs", checkAuthMiddleware, getJobsForApplicantController.handle);

export { applicantRoutes };
