import { Router } from "express";
import { checkEnterpriseJwtController, checkJwtController, userAuthController } from "../../core/useCases/users";

const userRouter = Router();

userRouter.post("/login", userAuthController.handle);
userRouter.post("/check-jwt", checkJwtController.handle);
userRouter.post("/check-enterprise", checkEnterpriseJwtController.handle)


export { userRouter }