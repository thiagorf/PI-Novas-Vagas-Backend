import { Response } from "express";
import { checkJwtUseCase } from ".";
import { AuthRequest } from "../../../../../../shared/types";

export class CheckJwtController {
    async handle(request: AuthRequest, response: Response) {
        const authHeader = request.headers["authorization"];

        const [, token] = authHeader.split(" ");

        const result = await checkJwtUseCase.perform(token);

        return response.json(result);
    }
}
