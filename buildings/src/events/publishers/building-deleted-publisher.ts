import { Publisher, Subjects, BuildingDeletedEvent } from "@ampdev/common";

export class BuildingDeletedPublisher extends Publisher<BuildingDeletedEvent> {
    subject: Subjects.BuildingDeleted = Subjects.BuildingDeleted;
}