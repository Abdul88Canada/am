import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Building } from '../models/buildings';

const router = express.Router();

router.get('/api/buildings/:id', requireAuth, async (req: Request, res: Response) => {
    const building = await Building.findById(req.params.id);

    if(!building) {
        throw new NotFoundError();
    }

    res.status(200).send(building);
});

export { router as showBuildingRouter }