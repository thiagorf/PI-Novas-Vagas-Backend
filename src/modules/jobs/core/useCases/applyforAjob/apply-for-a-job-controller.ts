import { Request, Response } from "express";
import { applyForAJobUseCase } from ".";

interface AuthRequest extends Request {
    user: {
        id: number;
    };
}

export class ApplyForAJobController {
    async handle(request: AuthRequest, response: Response) {
        const applicant_id = request.user.id;
        const jobs_id = Number(request.params.id);

        const result = await applyForAJobUseCase.perform({ user_id: applicant_id, jobs_id });

        return response.json(result);
    }
}
