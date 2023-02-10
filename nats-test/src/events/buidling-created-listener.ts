import { Message } from "node-nats-streaming";

import { Listener } from "./base-listener";

export class BuildingCreatedListener extends Listener {
    subject = 'building:created';
    qGroupName = 'authentication-service';

    onMessage(data: any, msg: Message) {
        console.log('Event Data', data);
    }
}