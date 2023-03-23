import { Subjects } from "./subjects";

export interface UserUpdatedEvent {
    subject: Subjects.UserUpdated;
    data: {
        user_id: String,
        user_type: string,
        created_at: Date,
        userName: String
    }
}