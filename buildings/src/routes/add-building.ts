import express, { Request, Response } from "express";
import { requireAuth } from "@ampdev/common";

import { Building } from "../models/buildings";

const router = express.Router();

router.post('api/buildings/addbuilding', requireAuth, async (req: Request, res: Response) => {
    const { name, location, viewersId } = req.body;

        const building = Building.build({ name, location, viewersId });
        await building.save();

        res.status(201).send(building);
});

export { router as createBuildingRouter }