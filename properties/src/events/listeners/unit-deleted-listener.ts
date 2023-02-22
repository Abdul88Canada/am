import { Message } from "node-nats-streaming";
import { Subjects, Listener, UnitDeletedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Property } from "../../models/properties";

export class UnitDeletedListener extends Listener<UnitDeletedEvent> {
    subject: Subjects.UnitDeleted = Subjects.UnitDeleted;
    qGroupName = qGroupName;

    async onMessage(data: UnitDeletedEvent['data'], msg: Message) {
        console.log('DATA FROM UNIT SERVICE PROPERTY LISTENER: ', data);
        const {user_id, property_id, unit_id} = data;
 
        const property =  await Property.updateOne({id: property_id}, {$pop: {units: unit_id}});
        msg.ack();
    }
}