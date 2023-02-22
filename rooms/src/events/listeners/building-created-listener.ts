import { Message } from "node-nats-streaming";
import { Subjects, Listener, BuildingCreatedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Building } from "../../models/buildings";
import { Users } from "../../models/users";

export class BuildingCreatedListener extends Listener<BuildingCreatedEvent> {
    subject: Subjects.BuildingCreated = Subjects.BuildingCreated;
    qGroupName = qGroupName;

    async onMessage(data: BuildingCreatedEvent['data'], msg: Message) {
        console.log('Data from Building Created Listener from Rooms service: ', data);
        const {id, name, location, user_id} = data;
        
        const building = await Building.build({id, name, location});
        await building.save();
        await Building.updateOne({id: id}, {$push: {user_id: user_id}});

        await Users.updateOne({user_id: user_id}, {$push: {linked_properties: building.id}});        

        msg.ack();
    }
}