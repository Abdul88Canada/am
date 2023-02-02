import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-valdiation-error';
import { DBConnectionError } from '../errors/db-connection-error';
import { BadRequestError } from '../errors/bad-request-error';

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
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array()); 
        }
        
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

        res.status(201).send(user);
});

export { router as signupRouter };