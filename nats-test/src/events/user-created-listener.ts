import { Message } from "node-nats-streaming";

import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { UserCreatedEvent } from "./user-created-event";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    qGroupName = 'building-service';

    onMessage(data: UserCreatedEvent['data'], msg: Message) {
        console.log('Event Data', data);

        msg.ack();
    }
}