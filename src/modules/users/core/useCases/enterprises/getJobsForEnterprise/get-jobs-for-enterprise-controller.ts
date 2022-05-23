import { Request, Response } from "express";
import { getJobsEnterpriseUseCase } from ".";



export class GetJobsEnterpriseController {
    async handle(request: Request, response: Response) {
        const id = Number(request.params.id);

        const result = await getJobsEnterpriseUseCase.perform(id);

        return response.json(result);
    }
}