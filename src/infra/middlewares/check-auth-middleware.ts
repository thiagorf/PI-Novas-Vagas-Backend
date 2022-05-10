import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

interface TokenPayload {
    subject: number
}

export const checkAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    const authHeader = request.headers["authorization"]

    if(!authHeader) {
        return response.status(401).json({
            msg: "Unauthorized"
        })
    }

    const [, token] = authHeader.split(' ');
    
    try {
        const { subject } = verify(token, process.env.JWT_SECRET as string) as TokenPayload
        
        request.user = {
            id: subject
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