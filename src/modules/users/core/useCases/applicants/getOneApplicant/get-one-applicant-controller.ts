import { Request, Response } from "express";
import { getOneApplicantUseCase } from ".";

export class GetOneApplicantController {
    async handle(request: Request, response: Response) {
        const applicant_id = Number(request.params.id);

        const result = await getOneApplicantUseCase.perform(applicant_id);

        return response.json(result);
    }
}
