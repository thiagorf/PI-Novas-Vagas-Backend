import { Router } from "express"
import { applicantsRoutes } from "./applicant-routes";
import { enterpriseRoutes } from "./enterprise-routes";
import { jobRoutes } from "./jobs-routes"
import { userRoutes } from "./user-routes";

const resources = [jobRoutes, applicantsRoutes, enterpriseRoutes, userRoutes]

const v1 = Router();

//v1.use("/v1", jobRoutes)

resources.forEach(resource => {
    v1.use("/v1", resource)
})



export { v1 }

