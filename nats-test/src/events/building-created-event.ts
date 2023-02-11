import { Subjects } from "./subjects";

export interface BuildingCreatedEvent {
    subject: Subjects.BuildingCreated;
    data: {
        id: string
    }
}