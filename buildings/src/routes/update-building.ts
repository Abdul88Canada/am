import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Building } from '../models/buildings';
import { Users } from '../models/users';

const router = express.Router();

router.put('/api/buildings/:id', requireAuth, async (req: Request, res: Response) => {
    const { name, location, user_id } = req.body;

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
    
    await Building.updateOne({id: req.params.id}, {$set: {name, location}});
    res.send(building);
});

export { router as updateBuildingRouter}