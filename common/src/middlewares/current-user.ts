import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
    phoneNumber: number;
    userName: string;
    user_type: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // check if user has jwt
    if(!req.session?.jwt) {
        return next();
    }

    // decode jwt to get user info
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch(err) {

    }

    next();
}