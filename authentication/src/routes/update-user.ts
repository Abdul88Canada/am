import express, { Request, Response} from 'express';
import { validateRequest, requireAuth } from '@ampdev/common';

import { Users } from '../models/users';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWraper } from "../nats-wrapper";

const router = express.Router();

router.put('/api/users/:id', requireAuth, async (req: Request, res: Response) => {

        const { user } = req.body;

        await Users.findOneAndUpdate({user_id: user.user_id}, {linked_properties: user.linked_properties} )


        console.log('FROM THE AUTH SERVICE IN UPDATE USERS UPDATED USER: ', user);

        res.status(201).send(user);
});

export { router as updateUserRouter };