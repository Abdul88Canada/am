import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ampdev/common';

import { Campaigns } from '../models/campgains';
import { Users } from '../models/users';

const router = express.Router();

router.get('/api/campaigns', requireAuth, async (req: Request, res: Response) => {
    console.log('From listCampaignsRouter');
    try {

        const user = await Users.findOne({user_id: req.currentUser!.id}); 

        if(!user) {
            throw new NotFoundError();
        }

        const list = user?.campaigns;

        const campaigns = await Campaigns.find( { _id: {$in: list} } );

        if(!campaigns) {
            throw new NotFoundError();
        }
        
        res.send(campaigns);
    } catch (error) {
        console.log('FROM THE CAMPAIGNS SERVICE WITH ERROR: ', error)
    }
});

export { router as listCampaignsRouter }