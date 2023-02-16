import { Message } from "node-nats-streaming";
import { Subjects, Listener, RoomDeletedEvent } from "@ampdev/common";

import { qGroupName } from "./q-group-name";
import { Building } from "../../models/buildings";

export class RoomDeletedListener extends Listener<RoomDeletedEvent> {
    subject: Subjects.RoomDeleted = Subjects.RoomDeleted;
    qGroupName = qGroupName;

    async onMessage(data: RoomDeletedEvent['data'], msg: Message) {
        console.log('DATA FROM ROOM SERVICE BUILDING LISTENER: ', data);
        const {user_id, building_id, room_id} = data;
 
        const building =  await Building.updateOne({id: building_id}, {$pop: {rooms: room_id}});
        msg.ack();
    }
}