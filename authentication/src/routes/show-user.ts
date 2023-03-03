import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Users } from '../models/users';

const router = express.Router();

router.get('/api/users/:id', requireAuth, async (req: Request, res: Response) => {
    
    const user = await Users.findOne({ user_id: req.params.id });

    if(!user) {
        throw new NotFoundError();
    }

    if(req.currentUser?.id !== user.owner_id) {
        throw new NotAuthorizedError();
    }

    res.status(200).send(user);
});

export { router as showUserRouter }