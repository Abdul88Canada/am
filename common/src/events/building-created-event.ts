import {Types} from 'mongoose';

import { Subjects } from "./subjects";

export interface BuildingCreatedEvent {
    subject: Subjects.BuildingCreated;
    data: {
        user_id: String,
        property_id: String
    }
}