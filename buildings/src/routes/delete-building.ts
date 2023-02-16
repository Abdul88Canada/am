import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Building } from '../models/buildings';
import { Users } from '../models/users';
import { BuildingDeletedPublisher } from '../events/publishers/building-deleted-publisher';
import { natsWraper } from "../nats-wrapper";

const router = express.Router();

router.delete('/api/buildings/:id', requireAuth, async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;

        const building = await Building.findById(req.params.id);

        if(!building) {
            throw new NotFoundError();
        }

        console.log('FROM DELETE BUILDING IN BUILDING SERVICE WITH ', building);
        await Building.deleteOne({id: req.params.id});

        await Users.updateOne({user_id}, {$pull: {linked_properties: req.params.id}});

        new BuildingDeletedPublisher(natsWraper.client).publish({
            user_id: user_id,
            property_id: building.id
        });

        res.send(building);
    } catch (error) {
        console.log('FROM THE BUILDING SERVICE WITH ERROR: ', error)
    }
});

export { router as deleteBuildingRouter}