import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import jwt  from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@ampdev/common';

import { Users } from '../models/users';
import { Authentication } from '../models/authentication';
import { natsWraper } from "../nats-wrapper";
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters')
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, userName, password } = req.body;
        console.log('I AM IN AUTH');
        const existingEmail = await Authentication.findOne({ email });
        const existingUserName = await Authentication.findOne({ userName });

        if (existingEmail) {
            throw new BadRequestError('Email in use');
        }

        if (existingUserName) {
            throw new BadRequestError('username in use');
        }

        const auth = Authentication.build({email, userName, password});
        await auth.save();

        const user_id = auth.id;
        const user_type = 'Owner';
        const created_at = new Date();

        const user = Users.build({user_id, user_type, created_at, userName});
        await user.save(function(err){
            if(err){
                console.log(err);
                return;
            }
        });
        // generate JWT
        const userJwt = jwt.sign({
            id: auth.id,
            email: auth.email,
            userName: auth.userName,
            user_type: user_type
        }, process.env.JWT_KEY!);

        // store it on session object
        req.session = {
            jwt: userJwt
        };

        new UserCreatedPublisher(natsWraper.client).publish({
            user_id: user_id,
            user_type: user_type,
            created_at: created_at,
            userName: userName
        });

        res.status(201).send(auth);
});

export { router as signupRouter };