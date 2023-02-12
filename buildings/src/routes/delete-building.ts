import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Building } from '../models/buildings';
import { Users } from '../models/users';
import { BuildingDeletedPublisher } from '../events/publishers/building-deleted-publisher';
import { natsWraper } from "../nats-wrapper";

const router = express.Router();

router.delete('/api/buildings/:id', requireAuth, async (req: Request, res: Response) => {
    const { user_id } = req.body;

    const building = await Building.findById(req.params.id);

    if(!building) {
        throw new NotFoundError();
    }

    const user = await Users.findById({user_id: user_id});

    if(!user) {
        throw new NotFoundError();
    }

    if (user.user_id.toString() !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    
    await Building.deleteOne({id: req.params.id});

    await Users.updateOne({user_id}, {$pull: {linked_properties: req.params.id}});

    new BuildingDeletedPublisher(natsWraper.client).publish({
        user_id: user_id,
        property_id: building.id
    });

    res.send(building);
});

export { router as updateBuildingRouter}