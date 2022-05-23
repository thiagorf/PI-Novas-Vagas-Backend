import { Request, Response } from "express";
import { checkEnterpriseJwtUseCase } from ".";
import { CheckEnterpriseJwtDTO } from "./check-enterprise-jwt-dto";


export class CheckEnterpriseJwtController {
    async handle(request: Request, response: Response) {
        const dto: CheckEnterpriseJwtDTO = request.body;

        const result = await checkEnterpriseJwtUseCase.perform(dto);

        return response.json(result);
    }
}