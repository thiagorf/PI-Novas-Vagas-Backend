import { Router } from "express"
import { applicantsRoutes } from "./applicant-routes";
import { enterpriseRoutes } from "./enterprise-routes";
import { jobRoutes } from "./jobs-routes"

const resources = [jobRoutes, applicantsRoutes, enterpriseRoutes]

const v1 = Router();

//v1.use("/v1", jobRoutes)

resources.forEach(resource => {
    v1.use("/v1", resource)
})



export { v1 }

