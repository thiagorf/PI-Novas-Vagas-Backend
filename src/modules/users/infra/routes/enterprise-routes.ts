import { Router } from "express";
import {
    createEnterpriseController,
    enterpriseAuthController
} from "../../core/useCases/enterprises";


const enterpriseRouter = Router();

enterpriseRouter.post("/", createEnterpriseController.handle);
enterpriseRouter.post("/login", enterpriseAuthController.handle)

export { enterpriseRouter }