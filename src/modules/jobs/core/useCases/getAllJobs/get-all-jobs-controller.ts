import { Request, Response } from "express";
import { getAllJobsSort, getAllJobsUseCase } from ".";

export interface PossibleQuerys {
    q?: string;
    address?: string;
    salary?: any;
    start_at?: string;
    ends_at?: string;
}

export class GetAllJobsController {
    async handle(request: Request, response: Response) {
        const result = await getAllJobsUseCase.perform();

        const paramOptions = Object.keys(request.query);

        if (paramOptions.length != 0) {
            const query: PossibleQuerys = request.query;
            const result = await getAllJobsSort.handle(query);

            return response.json(result);
        }

        return response.json(result);
    }
}
