import express, { Request, Response} from 'express';
import { requireAuth } from '@ampdev/common';

import { Room } from '../models/room';

const router = express.Router();

router.get('/api/rooms/roomsList', requireAuth,
    async (req: Request, res: Response) => {

        const roomList = await Room.find();

        res.status(200).send(roomList);
});

export { router as roomsListRouter }; 