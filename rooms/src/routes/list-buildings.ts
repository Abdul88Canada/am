import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Building } from '../models/buildings';
import { Users } from '../models/users';

const router = express.Router();

router.get('/api/rooms/buildings', requireAuth, async (req: Request, res: Response) => {
    
    try {
        const user = await Users.findOne({user_id: req.currentUser!.id});
        if(!user) {
            throw new NotFoundError();
        }
        const list = user?.linked_properties;

        const buildings = await Building.find( { id: {$in: list} } );

        if(!buildings) {
            throw new NotFoundError();
        }

        res.send(buildings);
    } catch (error) {
        console.log('FROM THE ROOMS SERVICE WITH ERROR: ', error)
    }
});

export { router as listBuildingsRouter }