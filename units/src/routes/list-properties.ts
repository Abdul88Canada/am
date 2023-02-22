import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Property } from '../models/properties';
import { Users } from '../models/users';

const router = express.Router();

router.get('/api/units/properties', requireAuth, async (req: Request, res: Response) => {
    
    try {
        const user = await Users.findOne({user_id: req.currentUser!.id});
        if(!user) {
            throw new NotFoundError();
        }
        const list = user?.linked_properties;

        const properties = await Property.find( { id: {$in: list} } );

        if(!properties) {
            throw new NotFoundError();
        }

        res.send(properties);
    } catch (error) {
        console.log('FROM THE UNITS SERVICE WITH ERROR: ', error)
    }
});

export { router as listPropertiesRouter }