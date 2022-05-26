import { Response, Request } from "express";
import { deleteJobUseCase } from ".";

export class DeleteJobController {
    async handle(request: Request, response: Response) {
        const jobId = Number(request.params.id);

        const result = await deleteJobUseCase.perform(jobId);

        return response.json(result);
    }
}
