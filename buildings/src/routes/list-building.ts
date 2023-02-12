import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Building } from '../models/buildings';
import { Users } from '../models/users';

const router = express.Router();

router.get('/api/buildings', requireAuth, async (req: Request, res: Response) => {

    const user = await Users.findOne({user_id: req.currentUser!.id});

    if(!user) {
        throw new NotFoundError();
    }

    const buildings = await Building.find( { $in: user?.linked_properties } );

    if(!buildings) {
        throw new NotFoundError();
    }

    res.send(buildings);
});

export { router as listBuildingsRouter }