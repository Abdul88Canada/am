import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@ampdev/common";

import { Users } from "../models/users";

const router = express.Router();

router.get('/api/users/getUsers', requireAuth, async (req: Request, res: Response) => {
    try {
        console.log('FROM THE AUTH SERVICE IN GET USERS WITH USER: ', req.currentUser!.id);
        const users = await Users.find({owner_id: req.currentUser!.id});

        if(!users) {
            throw new NotFoundError();
        }

        res.send(users);
    } catch (err) {
        console.log('FROM THE AUTH SERVICE WITH ERROR: ', err);
    }
});

export { router as getUsersRouter }