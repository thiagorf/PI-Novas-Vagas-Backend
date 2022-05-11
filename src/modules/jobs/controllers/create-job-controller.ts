import { Request, Response } from "express";
import { createJobUseCase } from "../abstractions/useCases/create-job-abstraction";

export class CreateJobController {
    async handle(request: Request, response: Response) {

        const enterprise_id = Number(request.params.id)

        const {
            title,
            salary,
            address,
            description,
            started_at,
            ends_at
        } = request.body

        const result = await createJobUseCase.perform({
            title,
            salary,
            address,
            description,
            enterprise_id,
            started_at,
            ends_at
        });

        return response.status(201).json(result);
    }
}