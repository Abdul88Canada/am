import express, { Request, Response} from 'express';
import { requireAuth } from '@ampdev/common';

import { Room } from '../models/room';

const router = express.Router();

router.get('/api/rooms', requireAuth,
    async (req: Request, res: Response) => {

        const rooms = await Room.find();

        res.status(200).send(rooms);
});

export { router as roomsListRouter }; 