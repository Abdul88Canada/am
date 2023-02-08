import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@ampdev/common';

import { Building } from '../models/buildings';

const router = express.Router();

router.get('/api/buildings/:id', requireAuth, async (req: Request, res: Response) => {
    const building = await Building.findById(req.params.id);

    if(!building) {
        throw new NotFoundError();
    }

    res.send(building);
});

export { router as showBuildingRouter }