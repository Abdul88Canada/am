import { Publisher, Subjects, PropertyDeletedEvent } from "@ampdev/common";

export class PropertyDeletedPublisher extends Publisher<PropertyDeletedEvent> {
    subject: Subjects.PropertyDeleted = Subjects.PropertyDeleted;
}