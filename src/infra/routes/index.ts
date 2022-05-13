
import { Router } from "express"
import { applicantsRoutes } from "./applicant-routes";
import { jobRoutes } from "./jobs-routes"

const resources = [jobRoutes, applicantsRoutes]

const v1 = Router();

//v1.use("/v1", jobRoutes)

resources.forEach(resource => {
    v1.use("/v1", resource)
})



export { v1 }

