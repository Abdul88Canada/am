import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Property } from '../models/properties';
import { Users } from '../models/users';
import { PropertyDeletedPublisher } from '../events/publishers/property-deleted-publisher';
import { natsWraper } from "../nats-wrapper";

const router = express.Router();

router.delete('/api/properties/:id', requireAuth, async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;

        if (req.currentUser?.userType !== 'Owner') {
            throw new NotAuthorizedError();
        }

        const property = await Property.findById(req.params.id);

        if(!property) {
            throw new NotFoundError();
        }

        console.log('FROM DELETE PROPERTY IN PROPERTY SERVICE WITH ', property);
        await Property.deleteOne({id: req.params.id});

        await Users.updateOne({user_id}, {$pull: {linked_properties: req.params.id}});

        new PropertyDeletedPublisher(natsWraper.client).publish({
            user_id: user_id,
            property_id: property.id
        });

        res.send(property);
    } catch (error) {
        console.log('FROM THE PROPERTY SERVICE WITH ERROR: ', error)
    }
});

export { router as deletePropertyRouter}