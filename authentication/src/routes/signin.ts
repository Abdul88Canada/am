import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt  from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@ampdev/common';

import { Users } from '../models/users';
import { Authentication } from '../models/authentication';

import { Password } from '../services/password';


const router = express.Router();

router.post('/api/users/signin', [
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Please enter a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { userName, password } = req.body;
    
        const existingUser = await Authentication.findOne({ userName });

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(String(existingUser.password), password);

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        const user = await Users.findOne({ userName })

        // generate JWT
        const userJwt = jwt.sign({
            id: user!.user_id,
            userName: user!.userName,
            user_type: user!.user_type
        }, process.env.JWT_KEY!);

        // store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
});

export { router as signinRouter };