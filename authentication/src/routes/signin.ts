import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt  from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@ampdev/common';

import { User } from '../models/user';
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
    
        const existingUser = await User.findOne({ userName });

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(String(existingUser.password), password);

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        // generate JWT
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
            phoneNumber: existingUser.phoneNumber,
            userName: existingUser.userName,
            userType: existingUser.userType
        }, process.env.JWT_KEY!);

        // store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
});

export { router as signinRouter };