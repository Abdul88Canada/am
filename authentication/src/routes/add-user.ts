import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest, NotAuthorizedError } from '@ampdev/common';

import { Users } from '../models/users';
import { Authentication } from '../models/authentication';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWraper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/users/add-user', [
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
        const { email, userName, phoneNumber, password } = req.body;

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
        const user_type = 'User';
        const full_name = '';
        const created_at = new Date();

        const user = Users.build({user_id, user_type, created_at, userName});

        await user.save(function(err){
            if(err){
                console.log(err);
                return;
            }
        });

        res.status(201).send(auth);
});

export { router as addUserRouter };