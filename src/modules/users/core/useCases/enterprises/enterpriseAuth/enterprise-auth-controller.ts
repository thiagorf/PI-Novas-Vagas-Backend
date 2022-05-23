import { Request, Response } from "express";
import { enterpriseAuthUseCase } from ".";
import { EnterpriseAuthDTO } from "./enterprise-auth-dto";

export class EnterpriseAuthController {
    async handle(request: Request, response: Response) {
        const dto: EnterpriseAuthDTO = request.body;

        const result = await enterpriseAuthUseCase.perform(dto);

        return response.json({
            token: result,
            isEnterprise: true
        });
    }
}