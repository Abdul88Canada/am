import express, { Request, Response } from "express";
import { requireAuth } from "@ampdev/common";

import { Building } from "../models/buildings";
import { BuildingCreatedPublisher } from "../events/publishers/building-created-publisher";
import { natsWraper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/buildings/addbuilding', requireAuth, async (req: Request, res: Response) => {
    const { name, location, user_id } = req.body;

    try {
        const building = Building.build({ name, location });
        await building.save();
        new BuildingCreatedPublisher(natsWraper.client).publish({
            user_id: user_id,
            property_id: building.id
        });

        res.status(201).send(building);
    } catch(err) {
        res.status(404).send(err);
    }
    
});

export { router as createBuildingRouter }