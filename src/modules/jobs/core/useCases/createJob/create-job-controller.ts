import { Request, Response } from "express";
import { createJobUseCase } from ".";
import { CreateJobDTO } from "./create-job-dto";

export class CreateJobController {
    async handle(request: Request, response: Response) {

        const enterprise_id = Number(request.params.id)

        const dto: CreateJobDTO = request.body

        const result = await createJobUseCase.perform({...dto, enterprise_id});

        return response.status(201).json(result);
    }
}