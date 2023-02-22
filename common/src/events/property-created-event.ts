import {Types} from 'mongoose';

import { Subjects } from "./subjects";

export interface PropertyCreatedEvent {
    subject: Subjects.PropertyCreated;
    data: {
        id: String,
        name: String,
        location: String,
        user_id: String
    }
}