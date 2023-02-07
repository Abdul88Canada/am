import express, { Request, Response } from "express";
import { requireAuth } from "@ampdev/common";

import { Building } from "../models/buildings";

const router = express.Router();

router.post('/api/buildings/addbuilding', requireAuth, async (req: Request, res: Response) => {
    const { name, location, viewersId } = req.body;

    console.log(req.body);
    try {
        const building = Building.build({ name, location, viewersId });
        await building.save();

        res.status(201).send(building);
    } catch(err) {
        res.status(404).send(err);
    }
    
});

export { router as createBuildingRouter }