import { Publisher, Subjects, PropertyCreatedEvent } from "@ampdev/common";

export class PropertyCreatedPublisher extends Publisher<PropertyCreatedEvent> {
    subject: Subjects.PropertyCreated = Subjects.PropertyCreated;
}