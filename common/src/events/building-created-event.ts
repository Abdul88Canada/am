import {Types} from 'mongoose';

import { Subjects } from "./subjects";

export interface BuildingCreatedEvent {
    subject: Subjects.BuildingCreated;
    data: {
        user_id: Types.ObjectId,
        property_id: Types.ObjectId
    }
}