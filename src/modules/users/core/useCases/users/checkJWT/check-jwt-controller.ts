import { Request, Response } from "express";
import { checkJwtUseCase } from ".";
import { CheckJwtDTO } from "./check-jwt-dto";

export class CheckJwtController {
    async handle(request: Request, response: Response) {
        const dto: CheckJwtDTO = request.body;

        const result = await checkJwtUseCase.perform(dto);

        return response.json(result);
    }
}