import { Message } from "node-nats-streaming";

import { Listener } from "./base-listener";
import { BuildingCreatedEvent } from "./building-created-event";
import { Subjects } from "./subjects";

export class BuildingCreatedListener extends Listener<BuildingCreatedEvent> {
    subject: Subjects.BuildingCreated = Subjects.BuildingCreated;
    qGroupName = 'authentication-service';

    onMessage(data: BuildingCreatedEvent['data'], msg: Message) {
        console.log('Event Data', data);
        msg.ack();
    }
}