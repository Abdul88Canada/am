import { Publisher, Subjects, OwnerCreatedEvent } from "@ampdev/common";

export class OwnerCreatedPublisher extends Publisher<OwnerCreatedEvent> {
    subject: Subjects.OwnerCreated = Subjects.OwnerCreated;
}