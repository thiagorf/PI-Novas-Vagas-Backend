import { Response, Request, response } from "express";
import { deleteJobUseCase } from ".";

export class DeleteJobController {
    async handle(request: Request, repsonse: Response) {
        const jobId = Number(request.params.id);

        const result = await deleteJobUseCase.perform(jobId);
        
        return response.json(result);
    }
}