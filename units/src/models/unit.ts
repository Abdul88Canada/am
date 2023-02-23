import mongoose from "mongoose";

//An interface that describes the properties
//that are required to create a new unit
interface UnitAttrs {
    unitNumber: String;
    unitState: Number;
    property_id: string;
    user_id: [string];
}

//An interface that describes the properties
//that a user model has
interface UnitModel extends mongoose.Model<UnitDoc> {
    build(attrs: UnitAttrs): UnitDoc;
}

//An interface that describes the properties
//that a user document has
interface UnitDoc extends mongoose.Document {
    unitNumber: String;
    unitState: Number;
    property_id: string;
    user_id: [string];
}

const unitSchema = new mongoose.Schema({
    unitNumber: {
        type: String,
        required: true
    },
    unitState: {
        type: Number,
        required: true
    },
    property_id: {
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

unitSchema.statics.build = (attrs: UnitAttrs) => {
    return new Unit(attrs);
}

const Unit = mongoose.model<UnitDoc, UnitModel>('Unit', unitSchema);

export { Unit };