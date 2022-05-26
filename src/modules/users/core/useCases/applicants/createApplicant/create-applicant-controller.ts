import { Request, Response } from "express";
import { createApplicantUseCase } from ".";
import { CreateApplicantDTO } from "./create-applicant-dto";

export class CreateApplicantController {
    async handle(request: Request, response: Response) {
        const dto: CreateApplicantDTO = request.body;

        const result = await createApplicantUseCase.perform(dto);

        return response.status(201).json(result);
    }
}
