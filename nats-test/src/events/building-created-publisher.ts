import { Publisher } from "./base-publisher";
import { BuildingCreatedEvent } from "./building-created-event";
import { Subjects } from "./subjects";

export class BuildingCreatedPublisher extends Publisher<BuildingCreatedEvent> {
    subject: Subjects.BuildingCreated = Subjects.BuildingCreated;
}