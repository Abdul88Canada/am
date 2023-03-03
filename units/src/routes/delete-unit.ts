import express, { Request, Response} from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Unit } from '../models/unit';
import { UnitDeletedPublisher } from '../events/publishers/unit-deleted-event';
import { natsWraper } from '../nats-wrapper';
import { Property } from '../models/properties';

const router = express.Router();

router.delete('/api/units/:id', requireAuth,
    async (req: Request, res: Response) => {
        try {
            const unit = await Unit.findByIdAndDelete(req.params.id);
            
            if (!unit) {
                throw new NotFoundError();
            }
            
            const propertyBU = await Property.findOne({id: unit!.property_id});
            const property = await Property.updateOne({id: unit!.property_id}, {$pull: {units: {_id: unit!._id}}});
            const propertyAU = await Property.findOne({id: unit!.property_id});

            res.status(200).send(unit);
        } catch (error) {
            console.log('FROM THE UNIT SERVICE WITH ERROR: ', error)
        }
});

export { router as deleteUnit }; 