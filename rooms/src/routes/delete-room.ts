import express, { Request, Response} from 'express';
import { NotFoundError, requireAuth } from '@ampdev/common';

import { Room } from '../models/room';
import { RoomDeletedPublisher } from '../events/publishers/room-deleted-event';
import { natsWraper } from '../nats-wrapper';
import { Building } from '../models/buildings';

const router = express.Router();

router.delete('/api/rooms/:id', requireAuth,
    async (req: Request, res: Response) => {
        try {
            const room = await Room.findByIdAndDelete(req.params.id);
            
            if (!room) {
                throw new NotFoundError();
            }
            const buildingBU = await Building.findOne({id: room!.building_id});
            console.log('FROM DELETE ROOM BUILDING BEFORE UPDATE ', buildingBU);
            const building = await Building.updateOne({id: room!.building_id}, {$pull: {rooms: {_id: room!._id}}});
            const buildingAU = await Building.findOne({id: room!.building_id});
            console.log('FROM DELETE ROOM BUILDING AFTER UPDATE ', buildingAU);
            res.status(200).send(room);
        } catch (error) {
            console.log('FROM THE ROOM SERVICE WITH ERROR: ', error)
        }
});

export { router as deleteRoom }; 