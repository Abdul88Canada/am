import mongoose from "mongoose";

//An interface that describes the properties
//that are required to create a new building
interface BuildingAttrs {
    name: String;
    location: String;
    user_id: String
}

//An interface that describes the properties
//that a building document has
export interface BuildingDoc extends mongoose.Document {
    name: String;
    location: String;
    user_id: [String]
}

//An interface that describes the properties
//that a building model has
interface BuildingModel extends mongoose.Model<BuildingDoc> {
    build(attrs: BuildingAttrs): BuildingDoc;
}

const buildingSchema = new mongoose.Schema({
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

buildingSchema.statics.build = (attrs: BuildingAttrs) => {
    return new Building(attrs);
}

const Building = mongoose.model<BuildingDoc, BuildingModel>('Building', buildingSchema);

export { Building };