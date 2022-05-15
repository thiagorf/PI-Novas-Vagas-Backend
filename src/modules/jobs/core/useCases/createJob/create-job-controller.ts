import { Request, Response } from "express";
import { createJobUseCase } from ".";
import { AuthRequest } from "../../../../../shared/types";
import { CreateJobDTO } from "./create-job-dto";

export class CreateJobController {
    async handle(request: AuthRequest, response: Response) {

        const enterprise_id = request.user.id

        const dto: CreateJobDTO = request.body

        const result = await createJobUseCase.perform({...dto, enterprise_id});

        return response.status(201).json(result);
    }
}