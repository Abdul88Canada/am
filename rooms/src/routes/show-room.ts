import express, { Request, Response} from 'express';
import { NotFoundError, requireAuth } from '@ampdev/common';

import { Room } from '../models/room';

const router = express.Router();

router.get('/api/rooms/:id', requireAuth,
    async (req: Request, res: Response) => {

        const room = await Room.findById(req.params.id);

        if (!room) {
            throw new NotFoundError();
        }
        
        res.status(200).send(room);
});

export { router as showRoom }; 