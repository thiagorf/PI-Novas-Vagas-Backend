import { Request, Response } from "express";
import { getOneJobUseCase } from "../abstractions/useCases";

export class GetOneJobController {
    async handle(request: Request, response: Response) {
        const id = Number(request.params.id);

        const result = await getOneJobUseCase.perform(id);

        return response.json(result)
    }
}