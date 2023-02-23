import { Message } from "node-nats-streaming";
import { Subjects, Listener, OwnerCreatedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Users } from "../../models/users";

export class OwnerCreatedListener extends Listener<OwnerCreatedEvent> {
    subject: Subjects.OwnerCreated = Subjects.OwnerCreated;
    qGroupName = qGroupName;

    async onMessage(data: OwnerCreatedEvent['data'], msg: Message) {
        console.log('Data from Owner Created Listener from Property service: ', data);
        const {user_id, full_name, user_type, created_at} = data;
 
        const user = Users.build({user_id, full_name, user_type, created_at});
        await user.save();
        console.log(user);
        msg.ack();
    }
}