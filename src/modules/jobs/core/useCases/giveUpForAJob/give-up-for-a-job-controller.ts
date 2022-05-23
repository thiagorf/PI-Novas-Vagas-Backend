import { Request, Response } from "express";
import { giveUpForAJobUseCase } from ".";

interface AuthRequest extends Request {
    user: {
        id: number
    }
}

export class GiveUpForAJobController {
    async handle(request: AuthRequest, response: Response) {
        const applicant_id = request.user.id;
        const jobs_id = Number(request.params.id);

        const result = await giveUpForAJobUseCase.perform({jobs_id, user_id: applicant_id});

        return response.json(result);
    }
}