import { Router } from "express";
import { checkAuthMiddleware } from "../../../../infra/middlewares/check-auth-middleware";
import {
    createApplicantController, 
    getAllApplicantsController, 
    getJobsForApplicantController
} from "../../core/useCases/applicants"


const applicantRouter = Router();

applicantRouter.post("/", createApplicantController.handle);
applicantRouter.get("/", getAllApplicantsController.handle)
applicantRouter.post("/:id/jobs", checkAuthMiddleware, getJobsForApplicantController.handle)


export { applicantRouter }