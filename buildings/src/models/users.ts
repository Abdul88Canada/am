import mongoose, {Types} from "mongoose";

//An interface that describes the properties
//that are required to create a new user
interface UsersAttrs {
    user_id: Types.ObjectId;
    user_type: String;
    fullname: String;
    created_at: Date;
}

//An interface that describes the properties
//that a user model has
interface UsersModel extends mongoose.Model<UsersDoc> {
    build(attrs: UsersAttrs): UsersDoc;
}

//An interface that describes the properties
//that a user document has
interface UsersDoc extends mongoose.Document {
    user_id: Types.ObjectId;
    user_type: String;
    fullname: String;
    created_at: Date;
}

const usersSchema = new mongoose.Schema({
    user_id: {
        type: Types.ObjectId,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    linked_properties: {
        type: [Types.ObjectId]
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