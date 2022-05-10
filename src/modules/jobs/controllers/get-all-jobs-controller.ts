import { Request, Response } from "express";
import { getAllJobsUseCase } from "../abstractions/useCases";



export class GetAllJobsController {
    async handle(request: Request, response: Response) {

        const result = await getAllJobsUseCase.perform()

        return response.json(result);
    }
}