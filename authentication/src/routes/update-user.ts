import express, { Request, Response} from 'express';
import { requireAuth, NotAuthorizedError } from '@ampdev/common';

import { Users } from '../models/users';
import { UserUpdatedPublisher } from '../events/publishers/user-updated-publisher';
import { natsWraper } from "../nats-wrapper";

const router = express.Router();

router.put('/api/users/:id', requireAuth, async (req: Request, res: Response) => {

        const { user } = req.body;

        if(req.currentUser?.id !== user.owner_id) {
                throw new NotAuthorizedError();
        }

        await Users.findOneAndUpdate({user_id: user.user_id}, {linked_properties: user.linked_properties} )


        console.log('FROM THE AUTH SERVICE IN UPDATE USERS UPDATED USER: ', user);
        new UserUpdatedPublisher(natsWraper.client).publish({
                user_id: user.user_id,
                full_name: user.full_name,
                user_type: user.user_type,
                created_at: user.created_at,
                owner_id: user.owner_id, 
                userName: user.userName,
                linked_properties: user.linked_properties
            });
        res.status(201).send(user);
});

export { router as updateUserRouter };