import { Router } from "express";
import { checkAuthMiddleware } from "../../../../infra/middlewares/check-auth-middleware";
import upload from "../../../../shared/multer";
import {
    createApplicantController,
    getAllApplicantsController,
    getJobsForApplicantController,
    getOneApplicantController,
} from "../../core/useCases/applicants";

const applicantRoutes = Router();

applicantRoutes.post(
    "/",
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "curriculum", maxCount: 1 },
    ]),
    createApplicantController.handle,
);
applicantRoutes.get("/", getAllApplicantsController.handle);
applicantRoutes.get("/:id/jobs", checkAuthMiddleware, getJobsForApplicantController.handle);
applicantRoutes.get("/:id", getOneApplicantController.handle);

export { applicantRoutes };
