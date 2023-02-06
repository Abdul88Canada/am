import express, { Request, Response} from 'express';
import { body } from 'express-validator';

import { Room } from '../models/room';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/rooms/addRoom', [
    body('roomNumber')
        .isLength({ min: 1, max: 5 })
        .withMessage('Room number must be between 1 and 5 digits')
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        const { roomNumber } = req.body;
        const existingRoom = await Room.findOne({ roomNumber });

        if (existingRoom) {
            throw new BadRequestError('Room already exists');
        }

        
        const roomState = 0;
        const room = Room.build({roomNumber, roomState});
        await room.save();

        res.status(201).send(room);
});

export { router as addRoomRouter };