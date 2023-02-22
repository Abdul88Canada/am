import {Types} from 'mongoose';

import { Subjects } from "./subjects";

export interface PropertyDeletedEvent {
    subject: Subjects.PropertyDeleted;
    data: {
        user_id: String,
        property_id: String
    }
}