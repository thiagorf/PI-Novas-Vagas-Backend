import { Request, Response } from "express";

import { getAllApllicantsUseCase } from ".";

export class GetAllApllicantsController {
    async handle(request: Request, response: Response) {
        const result = await getAllApllicantsUseCase.perform();

        return response.json(result);
    }
}