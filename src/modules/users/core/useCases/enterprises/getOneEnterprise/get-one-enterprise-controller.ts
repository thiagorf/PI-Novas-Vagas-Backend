import { Request, Response } from "express";
import { getOneEnterpriseUseCase } from ".";

export class GetOneEnterpiseController {
    async handle(request: Request, response: Response) {
        const enterprise_id = Number(request.params.id);

        const result = await getOneEnterpriseUseCase.perform(enterprise_id);

        return response.json(result);
    }
}
