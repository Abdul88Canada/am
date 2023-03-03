import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Property } from '../models/properties';

const router = express.Router();

router.get('/api/properties/:id', requireAuth, async (req: Request, res: Response) => {
    const property = await Property.findById(req.params.id);

    if(!property) {
        throw new NotFoundError();
    }

    res.status(200).send(property);
});

export { router as showPropertyRouter }