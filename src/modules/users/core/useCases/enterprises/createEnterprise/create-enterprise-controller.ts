import { Request, Response } from "express";
import { createEnterpriseUseCase } from ".";
import { CreateEnterpriseDTO } from "./create-enterprise-dto";

export class CreateEnterpriseController {
    async handle(request: Request, response: Response) {
        const dto: CreateEnterpriseDTO = request.body;

        const result = await createEnterpriseUseCase.perform(dto);

        return response.status(201).json(result);
    }
}