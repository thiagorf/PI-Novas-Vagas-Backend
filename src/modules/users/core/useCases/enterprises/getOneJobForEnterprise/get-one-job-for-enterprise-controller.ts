import { Response } from "express";
import { getOneJobForEnterpriseUseCase } from ".";
import { AuthRequest } from "../../../../../../shared/types";

export class GetOneJobForEnterpriseController {
    async handle(request: AuthRequest, response: Response) {
        const enterprise_id = Number(request.params.enterprise_id);
        const job_id = Number(request.params.jobs_id);

        const authenticated_id = request.user.id;

        const result = await getOneJobForEnterpriseUseCase.perform({ enterprise_id, job_id, authenticated_id });

        return response.json(result);
    }
}
