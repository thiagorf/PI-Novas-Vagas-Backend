import { Request, Response } from "express";
import { updateJobUseCase } from ".";
import { UpdateJobDTO } from "./update-job-dto";

export class UpdateJobController {
    async handle(request: Request, response: Response) {
        const job_id = Number(request.params.id);

        const dto: UpdateJobDTO = request.body;

        const result = await updateJobUseCase.perform(job_id, dto);

        return response.json(result);
    }
}
