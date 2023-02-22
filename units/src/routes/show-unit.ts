import express, { Request, Response} from 'express';
import { NotFoundError, requireAuth } from '@ampdev/common';

import { Unit } from '../models/unit';

const router = express.Router();

router.get('/api/units/:id', requireAuth,
    async (req: Request, res: Response) => {

        const unit = await Unit.findById(req.params.id);

        if (!unit) {
            throw new NotFoundError();
        }
        
        res.status(200).send(unit);
});

export { router as showUnit }; 