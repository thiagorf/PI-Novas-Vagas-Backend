import { Router } from "express";
import { createApplicantController } from "../../core/useCases/createApplicant";
import { getAllApplicantsController } from "../../core/useCases/getAllApplicants";


const applicantRouter = Router();

applicantRouter.post("/", createApplicantController.handle);
applicantRouter.get("/", getAllApplicantsController.handle)


export { applicantRouter }