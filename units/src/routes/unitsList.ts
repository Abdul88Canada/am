import express, { Request, Response} from 'express';
import { requireAuth } from '@ampdev/common';

import { Unit } from '../models/unit';

const router = express.Router();

router.get('/api/units', requireAuth,
    async (req: Request, res: Response) => {

        const units = await Unit.find();

        res.status(200).send(units);
});

export { router as unitsListRouter }; 