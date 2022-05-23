import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken"
import { AuthRequest } from "../../shared/types";

interface TokenPayload {
    sub: number
}

export const checkAuthMiddleware = async (request: AuthRequest, response: Response, next: NextFunction) => {

    const authHeader = request.headers["authorization"]

    if(!authHeader) {
        return response.status(401).json({
            msg: "Unauthorized"
        })
    }

    const [, token] = authHeader.split(' ');
    
    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as unknown as TokenPayload
        
        request.user = {
            id: sub
        }
        next()

        //TODO
    } catch (error) {
        return response.status(401).json({
            msg: "Invalid Token",
            error: error
        })
    }

}