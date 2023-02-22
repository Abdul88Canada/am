import { Subjects } from "./subjects";

export interface PropertyCreatedEvent {
    subject: Subjects.PropertyCreated;
    data: {
        id: string
    }
}