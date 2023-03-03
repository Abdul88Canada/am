import express, { Request, Response } from "express";
import { currentUser, requireAuth, validateRequest, NotAuthorizedError } from "@ampdev/common";
import { body } from "express-validator";

import { Property } from "../models/properties";
import { Users } from "../models/users";
import { PropertyCreatedPublisher } from "../events/publishers/property-created-publisher";
import { natsWraper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/properties', requireAuth, [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Provide a property name')
], validateRequest, async (req: Request, res: Response) => {
    const { name, location, user_id } = req.body;

    try {
        const property = Property.build({ name, location, user_id });
        await property.save();
        
        const user = await Users.updateOne({user_id: user_id}, {$push: {linked_properties: property.id}});

        console.log('FROM ADD PROPERTY SERVICE WITH: ', property.id);

        new PropertyCreatedPublisher(natsWraper.client).publish({
            id: property.id,
            name: name,
            location: location,
            user_id: user_id
        });

        res.status(201).send(property);
    } catch(err) {
        res.status(404).send(err);
    }
});

export { router as createPropertyRouter }