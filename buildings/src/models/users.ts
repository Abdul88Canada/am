import mongoose, {Types} from "mongoose";

import { BuildingDoc } from "./buildings";

//An interface that describes the properties
//that are required to create a new user
interface UsersAttrs {
    user_id: mongoose.Schema.Types.ObjectId;
    user_type: String;
    full_name?: String;
    created_at: Date;
    linked_properties?: [mongoose.Schema.Types.ObjectId];
}

//An interface that describes the properties
//that a user model has
interface UsersModel extends mongoose.Model<UsersDoc> {
    build(attrs: UsersAttrs): UsersDoc;
}

//An interface that describes the properties
//that a user document has
interface UsersDoc extends mongoose.Document {
    user_id: mongoose.Schema.Types.ObjectId;
    user_type: String;
    full_name?: String;
    created_at: Date;
    linked_properties?: [mongoose.Schema.Types.ObjectId];
}

const usersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
    },
    linked_properties: {
        type: [mongoose.Schema.Types.ObjectId],
        //ref: 'Building'
    },
    created_at: {
        type: Date
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

usersSchema.statics.build = (attrs: UsersAttrs) => {
    return new Users(attrs);
}

const Users = mongoose.model<UsersDoc, UsersModel>('Users', usersSchema);

export { Users };