import { Publisher } from "./base-publisher";
import { PropertyCreatedEvent } from "./property-created-event";
import { Subjects } from "./subjects";

export class PropertyCreatedPublisher extends Publisher<PropertyCreatedEvent> {
    subject: Subjects.PropertyCreated = Subjects.PropertyCreated;
}