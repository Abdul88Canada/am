import { Message, Stan } from "node-nats-streaming";

import { Subjects } from "./subjects";

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract qGroupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;

    private client: Stan;
    protected acWait = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOption() {
        return this.client
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setAckWait(this.acWait)
        .setDurableName(this.qGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.qGroupName,
            this.subscriptionOption()
        );

        subscription.on('message', (msg: Message) => {
            console.log(
                `Message Received: ${this.subject} / ${this.qGroupName}`
            );

            const parsedData = this.paresMesssage(msg);
            this.onMessage(parsedData, msg);
        })
    }

    paresMesssage(msg: Message) {
        const data = msg.getData();

        return typeof data === 'string'
        ? JSON.parse(data)
        : JSON.parse(data.toString('utf8'));
    }
}