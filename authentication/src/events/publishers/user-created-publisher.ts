import { Publisher, Subjects, UserCreatedEvent } from "@ampdev/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
}