import { Router } from "express";
import { userRoutes } from "../../modules/users/infra/routes/user-routes";

const prefixUserRoutes = Router();

prefixUserRoutes.use("/users", userRoutes);

export { prefixUserRoutes };
