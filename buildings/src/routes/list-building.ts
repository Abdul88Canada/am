import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Building } from '../models/buildings';
import { Users } from '../models/users';

const router = express.Router();

router.get('/api/buildings', requireAuth, async (req: Request, res: Response) => {
    try {

        const user = await Users.findOne({user_id: req.currentUser!.id}); 

        if(!user) {
            throw new NotFoundError();
        }

        const list = user?.linked_properties;

        const buildings = await Building.find( { _id: {$in: list} } );
        console.log('FROM THE BUILDING SERVICE FETCHED BUILDINGS : ', buildings);
        if(!buildings) {
            throw new NotFoundError();
        }
        res.send(buildings);
    } catch (error) {
        console.log('FROM THE BUILDING SERVICE WITH ERROR: ', error)
    }
});

export { router as listBuildingsRouter }