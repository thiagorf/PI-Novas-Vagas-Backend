import { Request, Response } from "express";
import { updateJobUseCase } from "../abstractions/useCases";



export class UpdateJobController {

    async handle(request: Request, response: Response) {

        const job_id = Number(request.params.id);

        const {
            title,
            salary,
            address,
            description,
            started_at,
            ends_at
        } = request.body;

        const result = await updateJobUseCase.perform(job_id, {
            title,
            salary,
            address,
            description,
            started_at,
            ends_at
        });

        return response.json(result)
    }
}