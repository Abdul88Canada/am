import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import jwt  from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters')
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, userName, phoneNumber, password } = req.body;

        const existingEmail = await User.findOne({ email });
        const existingUserName = await User.findOne({ userName });
        const existingPhoneNumber = await User.findOne({ phoneNumber });

        if (existingEmail) {
            throw new BadRequestError('Email in use');
        }

        if (existingUserName) {
            throw new BadRequestError('username in use');
        }

        if (existingPhoneNumber) {
            throw new BadRequestError('phoneNumber in use');
        }

        const user = User.build({email, userName, phoneNumber, password});
        await user.save();

        // generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        // store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
});

export { router as signupRouter };