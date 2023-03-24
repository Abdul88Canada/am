import express, { Request, Response } from "express";
import { currentUser, requireAuth, validateRequest, NotAuthorizedError } from "@ampdev/common";
import { body } from "express-validator";

import { Campaigns } from "../models/campgains";
import { Users } from "../models/users";


const router = express.Router();

router.post('/api/campaigns/create', requireAuth, async (req: Request, res: Response) => {
    const { campaign_name, product_info, user_id, targeting, handeling } = req.body;
    const created_at = new Date();

    try {
        const campgain = Campaigns.build({ campaign_name, product_info, user_id, targeting, created_at, handeling });
        await campgain.save();
        
        const user = await Users.updateOne({user_id: user_id}, {$push: {campaigns: campgain.id}});

        res.status(201).send(campgain);
    } catch(err) {
        res.status(404).send(err);
    }
});

export { router as createCampaignRouter }