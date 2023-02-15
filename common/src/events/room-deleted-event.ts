import { Subjects } from "./subjects";
import mongoose from "mongoose";

export interface RoomDeletedEvent {
    subject: Subjects.RoomDeleted;
    data: {
        user_id: String,
        room_id: string,
        building_id: string,
    }
}