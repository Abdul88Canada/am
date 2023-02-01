import { Request, Response, NextFunction } from "express";

import { RequestValidationError } from '../errors/request-valdiation-error';
import { DBConnectionError } from '../errors/db-connection-error';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction) => {
        if (err instanceof RequestValidationError) {
            return res.status(err.statusCode).send({ errors: err.serializeErrors() });
        }

        if (err instanceof DBConnectionError) {
            return res.status(err.statusCode).send({ errors: err.serializeErrors() });
        }
        
        res.status(400).send({
           errors: [{ message: 'Something went wrong' }]
        });
};