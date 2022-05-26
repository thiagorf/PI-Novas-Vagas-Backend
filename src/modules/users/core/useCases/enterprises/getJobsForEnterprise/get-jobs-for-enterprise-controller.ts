import { Response } from "express";
import { getJobsEnterpriseUseCase } from ".";
import { AuthRequest } from "../../../../../../shared/types";

export class GetJobsEnterpriseController {
    async handle(request: AuthRequest, response: Response) {
        const id = Number(request.params.id);

        const authenticated_id = request.user.id;

        const result = await getJobsEnterpriseUseCase.perform(id, authenticated_id);

        return response.json(result);
    }
}
