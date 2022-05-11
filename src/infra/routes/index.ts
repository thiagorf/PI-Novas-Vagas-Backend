
import { Router } from "express"
import { jobRoutes } from "./jobs-routes"

const v1 = Router();

v1.use("/v1", jobRoutes)


export { v1 }

