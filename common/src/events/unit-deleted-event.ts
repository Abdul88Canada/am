import { Subjects } from "./subjects";
import mongoose from "mongoose";

export interface UnitDeletedEvent {
    subject: Subjects.UnitDeleted;
    data: {
        user_id: String,
        unit_id: string,
        property_id: string,
    }
}