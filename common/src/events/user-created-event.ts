import { Subjects } from "./subjects";
import mongoose from "mongoose";

export interface UserCreatedEvent {
    subject: Subjects.UserCreated;
    data: {
        user_id: String,
        user_type: string,
        created_at: Date,
        userName: String
    }
}