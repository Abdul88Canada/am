import { Publisher, Subjects, BuildingCreatedEvent } from "@ampdev/common";

export class BuildingCreatedPublisher extends Publisher<BuildingCreatedEvent> {
    subject: Subjects.BuildingCreated = Subjects.BuildingCreated;
}