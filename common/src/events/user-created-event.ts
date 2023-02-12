import { Subjects } from "./subjects";
import mongoose from "mongoose";

export interface UserCreatedEvent {
    subject: Subjects.UserCreated;
    data: {
        user_id: mongoose.Schema.Types.ObjectId,
        full_name: string,
        user_type: string,
        created_at: Date
    }
}