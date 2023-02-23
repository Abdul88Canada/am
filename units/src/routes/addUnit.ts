import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest, requireAuth, currentUser } from '@ampdev/common';

import { Unit } from '../models/unit';
import { Property } from '../models/properties';

const router = express.Router();

router.post('/api/units/addUnit', [
    body('unitNumber')
        .isLength({ min: 1, max: 5 })
        .withMessage('Unit number must be between 1 and 5 digits')
    ], 
    validateRequest, requireAuth,
    async (req: Request, res: Response) => {
        const { unitNumber, selectedProperty, user_id } = req.body;
        const unitState = 0;

        const unit = Unit.build({unitNumber, unitState, property_id: selectedProperty, user_id});
        await unit.save();

        console.log('FROM UNITS SERVICE CREATED UNIT ', unit);

        console.log('FROM UNITS SERVICE UPDATED PROPERTY', selectedProperty);
        
        const property = await Property.updateOne({id: selectedProperty}, {$push: {units: unit}});

        console.log('FROM UNITS SERVICE UPDATED PROPERTY', property);

        res.status(201).send(unit);
});

export { router as addUnitRouter };