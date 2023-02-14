import mongoose from "mongoose";

//An interface that describes the properties
//that are required to create a new building
interface BuildingAttrs {
    id: String;
    name: String;
    location: String;
    rooms?: [String];
}

//An interface that describes the properties
//that a building document has
export interface BuildingDoc extends mongoose.Document {
    id: String;
    name: String;
    location: String;
    rooms?: [String];
}

//An interface that describes the properties
//that a building model has
interface BuildingModel extends mongoose.Model<BuildingDoc> {
    build(attrs: BuildingAttrs): BuildingDoc;
}

const buildingSchema = new mongoose.Schema({
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
    rooms: {
        type: [{
            roomNumber: {
                type: String
            },
            roomState: {
                type: Number
            }
        }]
    }
}
);

buildingSchema.statics.build = (attrs: BuildingAttrs) => {
    return new Building(attrs);
}

const Building = mongoose.model<BuildingDoc, BuildingModel>('Building', buildingSchema);

export { Building };