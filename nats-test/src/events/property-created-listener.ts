import { Message } from "node-nats-streaming";

import { Listener } from "./base-listener";
import { PropertyCreatedEvent } from "./property-created-event";
import { Subjects } from "./subjects";

export class PropertyCreatedListener extends Listener<PropertyCreatedEvent> {
    subject: Subjects.PropertyCreated = Subjects.PropertyCreated;
    qGroupName = 'authentication-service';

    onMessage(data: PropertyCreatedEvent['data'], msg: Message) {
        console.log('Event Data', data);
        msg.ack();
    }
}