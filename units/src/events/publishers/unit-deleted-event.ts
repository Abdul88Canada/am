import { Publisher, Subjects, UnitDeletedEvent } from "@ampdev/common";

export class UnitDeletedPublisher extends Publisher<UnitDeletedEvent> {
    subject: Subjects.UnitDeleted = Subjects.UnitDeleted;
}