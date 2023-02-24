import { Subjects } from "./subjects";
import mongoose from "mongoose";

export interface OwnerCreatedEvent {
    subject: Subjects.OwnerCreated;
    data: {
        user_id: String,
        full_name: string,
        user_type: string,
        created_at: Date,
        userName: String
    }
}