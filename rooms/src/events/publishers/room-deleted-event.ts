import { Publisher, Subjects, RoomDeletedEvent } from "@ampdev/common";

export class RoomDeletedPublisher extends Publisher<RoomDeletedEvent> {
    subject: Subjects.RoomDeleted = Subjects.RoomDeleted;
}