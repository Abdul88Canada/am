import mongoose from "mongoose";

//An interface that describes the properties
//that are required to create a new room
interface RoomAttrs {
    roomNumber: String;
    roomState: Number;
    building_id: string;
    user_id: [string];
}

//An interface that describes the properties
//that a user model has
interface RoomModel extends mongoose.Model<RoomDoc> {
    build(attrs: RoomAttrs): RoomDoc;
}

//An interface that describes the properties
//that a user document has
interface RoomDoc extends mongoose.Document {
    roomNumber: String;
    roomState: Number;
    building_id: string;
    user_id: [string];
}

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    roomState: {
        type: Number,
        required: true
    },
    building_id: {
        type: String
    },
    user_id: {
        type: [String]
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
            delete ret.__v;
        }
    }
});

roomSchema.statics.build = (attrs: RoomAttrs) => {
    return new Room(attrs);
}

const Room = mongoose.model<RoomDoc, RoomModel>('Room', roomSchema);

export { Room };