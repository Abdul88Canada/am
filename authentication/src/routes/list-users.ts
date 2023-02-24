import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@ampdev/common";

import { Users } from "../models/users";

const router = express.Router();

router.get('/api/users/getUsers', requireAuth, async (req: Request, res: Response) => {
    try {
        const users = await Users.find({owner_id: req.currentUser!.id}); 
        console.log('FROM AUTH SERVICE IN LIST USERS FOUND: ', users);
        if(!users) {
            throw new NotFoundError();
        }

        res.send(users);
    } catch (err) {
        console.log('FROM THE AUTH SERVICE WITH ERROR: ', err);
    }
});

export { router as getUsersRouter }