import express, { Request, Response } from "express";

import { Users } from "../models/users";

const router = express.Router();

router.get('/api/users/queryUsers', async (req: Request, res: Response) => {
    try {
        const users = await Users.find({}); 


        res.send(users);
    } catch (err) {
        console.log('FROM THE AUTH SERVICE WITH ERROR: ', err);
    }
});

export { router as queryUsersRouter }