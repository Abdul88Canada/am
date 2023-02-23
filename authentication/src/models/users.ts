import mongoose, {Types} from "mongoose";

//An interface that describes the properties
//that are required to create a new user
interface UsersAttrs {
    user_id: String;
    user_type: String;
    full_name: String;
    created_at: Date;
    owner_id?: String;
}

//An interface that describes the properties
//that a user model has
interface UsersModel extends mongoose.Model<UsersDoc> {
    build(attrs: UsersAttrs): UsersDoc;
}

//An interface that describes the properties
//that a user document has
interface UsersDoc extends mongoose.Document {
    user_id: String;
    user_type: String;
    full_name: String;
    created_at: Date;
    owner_id?: String;
}

const usersSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    linked_properties: {
        type: [String]
    },
    created_at: {
        type: Date
    },
    owner_id: {
        type: String
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