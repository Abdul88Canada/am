import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest, requireAuth } from '@ampdev/common';

import { Room } from '../models/room';
import { Building } from '../models/buildings';

const router = express.Router();

router.post('/api/rooms/addRoom', [
    body('roomNumber')
        .isLength({ min: 1, max: 5 })
        .withMessage('Room number must be between 1 and 5 digits')
    ], 
    validateRequest, requireAuth,
    async (req: Request, res: Response) => {
        const { roomNumber, selectedBuilding } = req.body;
        const roomState = 0;

        const room = Room.build({roomNumber, roomState});
        await room.save();

        console.log('FROM ROOMS SERVICE CREATED ROOM ', room);

        console.log('FROM ROOMS SERVICE UPDATED BUILDING', selectedBuilding);
        
        const building = await Building.updateOne({id: selectedBuilding}, {$push: {rooms: room}});

        console.log('FROM ROOMS SERVICE UPDATED BUILDING', building);

        res.status(201).send(room);
});

export { router as addRoomRouter };