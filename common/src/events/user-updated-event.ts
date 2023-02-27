import { Subjects } from "./subjects";

export interface UserUpdatedEvent {
    subject: Subjects.UserUpdated;
    data: {
        user_id: String,
        full_name: string,
        user_type: string,
        created_at: Date,
        owner_id: String,
        userName: String
    }
}