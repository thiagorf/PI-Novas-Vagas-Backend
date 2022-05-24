import { Request, Response } from "express";
import { getJobsForApplicantUseCase } from ".";
import { AuthRequest } from "../../../../../../shared/types";

export class GetJobsForApplicantController {
    async handle(request: AuthRequest, response: Response) {
        const applicant_id = Number(request.params.id);

        const authenticated_id = request.user.id;

        const result = await getJobsForApplicantUseCase.perform(applicant_id, authenticated_id);

        return response.json(result);
    }
}