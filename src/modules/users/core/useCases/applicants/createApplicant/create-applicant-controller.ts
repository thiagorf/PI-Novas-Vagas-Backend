import { Request, Response } from "express";
import { createApplicantUseCase } from ".";
import { CreateApplicantDTO } from "./create-applicant-dto";

export class CreateApplicantController {
    async handle(request: Request, response: Response) {
        const photo = request.files["photo"][0].path;
        const curriculum = request.files["curriculum"][0].path;

        const dto: CreateApplicantDTO = request.body;

        const result = await createApplicantUseCase.perform({ ...dto, photo, curriculum });

        return response.status(201).json(result);
    }
}
