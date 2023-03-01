import { Publisher, Subjects, UserUpdatedEvent } from "@ampdev/common";

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
}