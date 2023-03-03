import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Property } from '../models/properties';
import { Users } from '../models/users';

const router = express.Router();

router.put('/api/properties/:id', requireAuth, async (req: Request, res: Response) => {
    const { name, location, user_id } = req.body;

    const property = await Property.findById(req.params.id);

    if(!property) {
        throw new NotFoundError();
    }

    if(req.currentUser?.id !== property.user_id.toString()) {
        throw new NotAuthorizedError();
    }

    const user = await Users.findById({user_id: user_id});

    if(!user) {
        throw new NotFoundError();
    }

    if (user.user_id.toString() !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    
    await Property.updateOne({id: req.params.id}, {$set: {name, location}});
    res.send(property);
});

export { router as updatePropertyRouter}