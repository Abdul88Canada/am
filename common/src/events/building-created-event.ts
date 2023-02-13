import {Types} from 'mongoose';

import { Subjects } from "./subjects";

export interface BuildingCreatedEvent {
    subject: Subjects.BuildingCreated;
    data: {
        id: String,
        name: String,
        location: String
    }
}