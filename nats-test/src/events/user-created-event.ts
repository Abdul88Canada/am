import { Subjects } from "./subjects";

export interface UserCreatedEvent {
    subject: Subjects.UserCreated;
    data: {
        id: string,
        full_name: string,
        linked_properties: [string],
        user_type: string,
        created_at: Date
    }
}