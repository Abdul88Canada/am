import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@ampdev/common';

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
        const { email, userName, phoneNumber, password, owner_id } = req.body;

        const existingEmail = await Authentication.findOne({ email });
        const existingUserName = await Authentication.findOne({ userName });
        const existingPhoneNumber = await Authentication.findOne({ phoneNumber });

        if (existingEmail) {
            throw new BadRequestError('Email in use');
        }

        if (existingUserName) {
            throw new BadRequestError('username in use');
        }

        if (existingPhoneNumber) {
            throw new BadRequestError('phoneNumber in use');
        }

        const auth = Authentication.build({email, userName, phoneNumber, password});
        await auth.save();

        const user_id = auth.id;
        const user_type = 'User';
        const full_name = '';
        const created_at = new Date();

        const user = Users.build({user_id, user_type, full_name, created_at, owner_id});

        new UserCreatedPublisher(natsWraper.client).publish({
            user_id,
            full_name,
            user_type,
            created_at,
            owner_id
        });

        res.status(201).send(auth);
});

export { router as addUserRoute };