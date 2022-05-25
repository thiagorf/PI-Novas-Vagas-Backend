import { Router } from "express";
import { enterpriseRoutes } from "../../modules/users/infra/routes/enterprise-routes";

const prefixEnterpriseRoutes = Router();

prefixEnterpriseRoutes.use("/enterprises", enterpriseRoutes);

export { prefixEnterpriseRoutes };
