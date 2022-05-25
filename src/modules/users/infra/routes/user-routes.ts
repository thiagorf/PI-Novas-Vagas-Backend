import { Router } from "express";
import { checkEnterpriseJwtController, checkJwtController, userAuthController } from "../../core/useCases/users";

const userRoutes = Router();

userRoutes.post("/login", userAuthController.handle);
userRoutes.post("/check-jwt", checkJwtController.handle);
userRoutes.post("/check-enterprise", checkEnterpriseJwtController.handle);

export { userRoutes };
