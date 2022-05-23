import { Router } from "express";
import { userRouter } from "../../modules/users/infra/routes/user-routes";

const userRoutes = Router();

userRoutes.use("/users", userRouter);


export { userRoutes }