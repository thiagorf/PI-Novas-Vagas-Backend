import { Response } from "express";
import { createJobUseCase } from ".";
import { AuthRequest } from "../../../../../shared/types";
import { CreateJobDTO } from "./create-job-dto";

export class CreateJobController {
    async handle(request: AuthRequest, response: Response) {
        const user_id = request.user.id;

        const dto: CreateJobDTO = request.body;

        const result = await createJobUseCase.perform({ ...dto, user_id });

        return response.json(result);
    }
}
