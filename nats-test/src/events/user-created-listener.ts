import { Message } from "node-nats-streaming";

import { Listener } from "./base-listener";

export class UserCreatedListener extends Listener {
    subject = 'user:created';
    qGroupName = 'building-service';

    onMessage(data: any, msg: Message) {
        console.log('Event Data', data);

        msg.ack();
    }
}