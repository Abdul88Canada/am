import {Types} from 'mongoose';

import { Subjects } from "./subjects";

export interface BuildingDeletedEvent {
    subject: Subjects.BuildingDeleted;
    data: {
        user_id: String,
        property_id: String
    }
}