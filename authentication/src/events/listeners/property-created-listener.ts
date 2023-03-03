import { Message } from "node-nats-streaming";
import { Subjects, Listener, PropertyCreatedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Property } from "../../models/properties";
import { Users } from "../../models/users";

export class PropertyCreatedListener extends Listener<PropertyCreatedEvent> {
    subject: Subjects.PropertyCreated = Subjects.PropertyCreated;
    qGroupName = qGroupName;

    async onMessage(data: PropertyCreatedEvent['data'], msg: Message) {
        console.log('Data from Property Created Listener from Units service: ', data);
        const {id, name, location, user_id} = data;
        
        const property = await Property.build({id, name, location});
        await property.save();
        await Property.updateOne({id: id}, {$push: {user_id: user_id}});

        await Users.updateOne({user_id: user_id}, {$push: {linked_properties: property.id}});        

        msg.ack();
    }
}