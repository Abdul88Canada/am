import { Message } from "node-nats-streaming";
import { Subjects, Listener, PropertyDeletedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Property } from "../../models/properties";
import { Users } from "../../models/users";

export class PropertyDeletedListener extends Listener<PropertyDeletedEvent> {
    subject: Subjects.PropertyDeleted = Subjects.PropertyDeleted;
    qGroupName = qGroupName;

    async onMessage(data: PropertyDeletedEvent['data'], msg: Message) {
        console.log('Data from Property Created Listener from Auth service: ', data);
        const {property_id, user_id} = data;
        
        const property = await Property.findOneAndDelete({id: property_id});

        await Users.updateOne({user_id: user_id}, {$pull: {linked_properties: property_id}});        

        msg.ack();
    }
}