import mongoose from "mongoose";

//An interface that describes the properties
//that are required to create a new property
interface PropertyAttrs {
    name: String;
    location: String;
    user_id: String
}

//An interface that describes the properties
//that a property document has
export interface PropertyDoc extends mongoose.Document {
    name: String;
    location: String;
    user_id: [String]
}

//An interface that describes the properties
//that a property model has
interface PropertyModel extends mongoose.Model<PropertyDoc> {
    build(attrs: PropertyAttrs): PropertyDoc;
}

const propertySchema = new mongoose.Schema({
    user_id: {
        type: [String]
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
    }
}, {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

propertySchema.statics.build = (attrs: PropertyAttrs) => {
    return new Property(attrs);
}

const Property = mongoose.model<PropertyDoc, PropertyModel>('Property', propertySchema);

export { Property };