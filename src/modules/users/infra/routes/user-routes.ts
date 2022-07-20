import { Router } from "express";
import { checkJwtController, userAuthController } from "../../core/useCases/users";

const userRoutes = Router();

userRoutes.post("/login", userAuthController.handle);
userRoutes.post("/check-jwt", checkJwtController.handle);

export { userRoutes };
