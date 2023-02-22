import mongoose from "mongoose";

//An interface that describes the properties
//that are required to create a new property
interface PropertyAttrs {
    id: String;
    user_id?: [String];
    name: String;
    location: String;
    units?: [String];
}

//An interface that describes the properties
//that a property document has
export interface PropertyDoc extends mongoose.Document {
    id: String;
    name: String;
    user_id?: [String];
    location: String;
    units?: [String];
}

//An interface that describes the properties
//that a property model has
interface PropertyModel extends mongoose.Model<PropertyDoc> {
    build(attrs: PropertyAttrs): PropertyDoc;
}

const propertySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    user_id: {
        type: [String]
    },
    units: {
        type: [{
            unitNumber: {
                type: String
            },
            unitState: {
                type: Number
            },
            unit_id: {
                type: String
            }
        }]
    }
}
);

propertySchema.statics.build = (attrs: PropertyAttrs) => {
    return new Property(attrs);
}

const Property = mongoose.model<PropertyDoc, PropertyModel>('Property', propertySchema);

export { Property };