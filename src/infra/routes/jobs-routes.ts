import { Router } from "express";
import { getAlljobsController } from "../../modules/jobs/abstractions/controllers";

const jobsRouter = Router();

jobsRouter.get("/", getAlljobsController.handle)



export { jobsRouter }