import { Request, Response } from "express";
import { userAuthUseCase } from ".";
import { UserAuthDTO } from "./user-auth-dto";

export class UserAuthController {
    async handle(request: Request, response: Response) {
        const dto: UserAuthDTO = request.body;

        const result = await userAuthUseCase.perform(dto);

        return response.json(result);
    }
}
