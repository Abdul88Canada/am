import { Message } from "node-nats-streaming";
import { Subjects, Listener, BuildingDeletedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Building } from "../../models/buildings";
import { Users } from "../../models/users";

export class BuildingDeletedListener extends Listener<BuildingDeletedEvent> {
    subject: Subjects.BuildingDeleted = Subjects.BuildingDeleted;
    qGroupName = qGroupName;

    async onMessage(data: BuildingDeletedEvent['data'], msg: Message) {
        console.log('Data from Building Created Listener from Rooms service: ', data);
        const {property_id, user_id} = data;
        
        const building = await Building.findOneAndDelete({id: property_id});

        await Users.updateOne({user_id: user_id}, {$pull: {linked_properties: property_id}});        

        msg.ack();
    }
}