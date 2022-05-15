import { Router } from "express";
import { enterpriseRouter } from "../../modules/users/infra/routes/enterprise-routes";

const enterpriseRoutes = Router();

enterpriseRoutes.use("/enterprises", enterpriseRouter)

export { enterpriseRoutes }