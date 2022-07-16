import { Router } from "express";
import { prefixApplicantsRoutes } from "./prefix-applicant-routes";
import { prefixEnterpriseRoutes } from "./prefix-enterprise-routes";
import { prefixJobRoutes } from "./prefix-jobs-routes";
import { prefixUserRoutes } from "./prefix-user-routes";

const resources = [prefixJobRoutes, prefixApplicantsRoutes, prefixEnterpriseRoutes, prefixUserRoutes];

const v1 = Router();

resources.forEach((resource) => {
    v1.use("/v1", resource);
});

export { v1 };
