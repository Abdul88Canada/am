import { Message } from "node-nats-streaming";
import { Subjects, Listener, UserUpdatedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Users } from "../../models/users";
import  { Property } from '../../models/properties';

export class UserUpdatedListener extends Listener<UserUpdatedEvent> {
    subject: Subjects.UserUpdated = Subjects.UserUpdated;
    qGroupName = qGroupName;

    async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
        console.log('Data from User Updated Listener from Property service: ', data);
        const {user_id, full_name, user_type, created_at, owner_id, userName, linked_properties} = data;
 
        await Users.findOneAndUpdate({user_id}, {linked_properties, full_name, user_type, created_at, owner_id, userName});

        const properties = await Property.find( { id: {$in: linked_properties} } );
        const updatedProperties = properties.map(async property => {
            if (!property.user_id.includes(user_id)) {
                property.user_id.push(user_id);
            }
            await Property.updateOne({_id: property._id}, {$set: {user_id: property.user_id}})
        });
        console.log('FROM PROPERTY SERVICE UPDATED PROPERTIES: ', updatedProperties);
        msg.ack();
    }
}