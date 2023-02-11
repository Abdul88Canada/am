import mongoose from "mongoose";

import { Password } from "../services/password";

//An interface that describes the properties
//that are required to create a new user
interface AuthenticationAttrs {
    email: String;
    phoneNumber: Number;
    userName: String;
    password: String;
}

//An interface that describes the properties
//that a user model has
interface AuthenticationModel extends mongoose.Model<AuthenticationDoc> {
    build(attrs: AuthenticationAttrs): AuthenticationDoc;
}

//An interface that describes the properties
//that a user document has
interface AuthenticationDoc extends mongoose.Document {
    email: String;
    phoneNumber: Number;
    userName: String;
    password: String;
}

const authenticationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
            delete ret.password;
            delete ret.__v;
        }
    }
});

authenticationSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed); 
        
    }
    done();
});

authenticationSchema.statics.build = (attrs: AuthenticationAttrs) => {
    return new Authentication(attrs);
}

const Authentication = mongoose.model<AuthenticationDoc, AuthenticationModel>('Authentication', authenticationSchema);

export { Authentication };