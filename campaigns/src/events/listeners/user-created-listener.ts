import { Message } from "node-nats-streaming";
import { Subjects, Listener, UserCreatedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Users } from "../../models/users";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    qGroupName = qGroupName;

    async onMessage(data: UserCreatedEvent['data'], msg: Message) {
        console.log('Data from User Created Listener from Campaigns service: ', data);
        const {user_id, user_type, created_at, userName} = data;
 
        const user = Users.build({user_id, user_type, created_at, userName});
        await user.save();
        msg.ack();
    }
}