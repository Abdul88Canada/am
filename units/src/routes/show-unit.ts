import express, { Request, Response} from 'express';
import { NotFoundError, requireAuth, NotAuthorizedError } from '@ampdev/common';

import { Unit } from '../models/unit';

const router = express.Router();

router.get('/api/units/:id', requireAuth,
    async (req: Request, res: Response) => {

        const unit = await Unit.findById(req.params.id);

        if (!unit) {
            throw new NotFoundError();
        }
        
        if (!unit.user_id.find(user => user !== req.currentUser?.id)) {
            throw new NotAuthorizedError();
        }

        res.status(200).send(unit);
});

export { router as showUnit }; 