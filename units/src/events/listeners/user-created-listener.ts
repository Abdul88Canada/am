import { Message } from "node-nats-streaming";
import { Subjects, Listener, UserCreatedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Users } from "../../models/users";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
    qGroupName = qGroupName;

    async onMessage(data: UserCreatedEvent['data'], msg: Message) {
        console.log('Data from User Created Listener from Property service: ', data);
        const {user_id, full_name, user_type, created_at, owner_id, userName} = data;
 
        const user = Users.build({user_id, full_name, user_type, created_at, owner_id, userName});
        await user.save();
        console.log(user);
        msg.ack();
    }
}