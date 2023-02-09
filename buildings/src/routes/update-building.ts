import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Building } from '../models/buildings';

const router = express.Router();

router.put('/api/buildings/:id', requireAuth, async (req: Request, res: Response) => {
    const building = await Building.findById(req.params.id);

    if(!building) {
        throw new NotFoundError();
    }

    building.viewersId.map(viewerId => {
        if(viewerId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
    })
    

    res.send(building);
});

export { router as updateBuildingRouter}