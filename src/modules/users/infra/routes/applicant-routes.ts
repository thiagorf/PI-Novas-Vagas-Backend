import { Router } from "express";
import {
    createApplicantController, 
    getAllApplicantsController 
} from "../../core/useCases/applicants"


const applicantRouter = Router();

applicantRouter.post("/", createApplicantController.handle);
applicantRouter.get("/", getAllApplicantsController.handle)


export { applicantRouter }