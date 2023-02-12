import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@ampdev/common";
import { body } from "express-validator";

import { Building } from "../models/buildings";
import { Users } from "../models/users";
import { BuildingCreatedPublisher } from "../events/publishers/building-created-publisher";
import { natsWraper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/buildings', requireAuth, [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Provide a property name')
], validateRequest, async (req: Request, res: Response) => {
    const { name, location, user_id } = req.body;

    try {
        const building = Building.build({ name, location });
        await building.save();

       await Users.updateOne({user_id: req.currentUser!.id}, {$push: {linked_properties: building.id}});


        new BuildingCreatedPublisher(natsWraper.client).publish({
            user_id: req.currentUser!.id,
            property_id: building.id
        });

        res.status(201).send(building);
    } catch(err) {
        res.status(404).send(err);
    }
});

export { router as createBuildingRouter }