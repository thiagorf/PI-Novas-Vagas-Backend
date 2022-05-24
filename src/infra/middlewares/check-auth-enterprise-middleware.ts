import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken"
import { AuthRequest } from "../../shared/types";
import prisma from "../database/prisma";

interface TokenPayload {
    sub: number
}

export const checkAuthEnterpriseMiddleware = async (request: AuthRequest, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({
            msg: "Unauthorized"
        })
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as unknown as TokenPayload
        
        const user = await prisma.user.findUnique({
            where: {
                id: sub
            }
        });

        if(!user) {
            return response.status(401).json({
                msg: "Invalid Token"
            })
        }
        
        if(user.type === "enterprise") {
            request.user = {
                id: sub
            }
            
            return next();
        }

        return response.status(401).json({
            msg: "Unauthorized"
        })

    } catch (error) {
        return response.status(401).json({
            msg: "Invalid Token",
            error: error
        })
    }
}