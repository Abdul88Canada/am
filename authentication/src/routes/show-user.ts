import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Users } from '../models/users';

const router = express.Router();

router.get('/api/users/:id', requireAuth, async (req: Request, res: Response) => {
    console.log('IN AUTH SERVICE WITH USER: ', req.params.id)
    const user = await Users.findOne({ user_id: req.params.id });
    console.log('IN AUTH SERVICE FOUND USER: ', user)
    if(!user) {
        throw new NotFoundError();
    }

    res.status(200).send(user);
});

export { router as showUserRouter }