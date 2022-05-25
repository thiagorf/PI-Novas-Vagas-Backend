import { Response } from "express";
import { giveUpForAJobUseCase } from ".";
import { AuthRequest } from "../../../../../shared/types";

export class GiveUpForAJobController {
    async handle(request: AuthRequest, response: Response) {
        const applicant_id = request.user.id;
        const jobs_id = Number(request.params.id);

        const result = await giveUpForAJobUseCase.perform({ jobs_id, user_id: applicant_id });

        return response.json(result);
    }
}
