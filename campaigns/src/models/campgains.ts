import mongoose, {Types} from "mongoose";


//An interface that describes the properties
//that are required to create a new campaigns
interface CampaignsAttrs {
    user_id: String;
    created_at: Date;
    campaign_name: String;
    product_info?: {};
    targeting?: {};
    handeling?: {};
}

//An interface that describes the properties
//that a campaigns model has
interface CampaignsModel extends mongoose.Model<CampaignsDoc> {
    build(attrs: CampaignsAttrs): CampaignsDoc;
}

//An interface that describes the properties
//that a user document has
interface CampaignsDoc extends mongoose.Document {
    user_id: String;
    created_at: Date;
    campaign_name: String;
    product_info?: {};
    targeting?: {};
    handeling?: {};
}

const campaignsSchema = new mongoose.Schema({
    campaign_name: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    },
    product_info: {
        name: {
            type: String
        },
        type: {
            type: String
        },
        format: {
            type: String
        },
        quantity: {
            type: Number
        },
        start_date: {
            type: Date
        },
        duration: {
            type: Number
        },
        instructions: {
            type: String
        },
        expiry_date: {
            type: Date
        }
    },
    targeting: {
        age: {
            type: [String]
        },
        segment: {
            type: [String]
        },
        gender: {
            type: String
        },
        countries: {
            type: [String]
        },
        cities: {
            type: [String]
        }
    },
    created_at: {
        type: Date
    },
    handeling: {
        package_type: {
            type: String
        },
        isLiquid: {
            type: Boolean
        },
        temperature: {
            type: String
        },
        require_co_package: {
            type: Boolean
        },
        co_packaging_needs: {
            type: String
        },
        samples_per_bundle: {
            type: Number
        },
        require_printing: {
            type: Boolean
        },
        printing_need: {
            type: String
        }
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

campaignsSchema.statics.build = (attrs: CampaignsAttrs) => {
    return new Campaigns(attrs);
}

const Campaigns = mongoose.model<CampaignsDoc, CampaignsModel>('Campaigns', campaignsSchema);

export { Campaigns };