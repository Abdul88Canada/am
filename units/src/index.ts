import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@ampdev/common';

import { addUnitRouter } from './routes/addUnit';
import {unitsListRouter} from './routes/unitsList';
import { listPropertiesRouter } from './routes/list-properties';
import { showUnit } from './routes/show-unit';
import { deleteUnit } from './routes/delete-unit';

import { natsWraper } from './nats-wrapper';
import { PropertyCreatedListener } from './events/listeners/property-created-listener';
import { PropertyDeletedListener } from './events/listeners/property-deleted-listener';
import { OwnerCreatedListener } from './events/listeners/owner-created-listener';
import { UserCreatedListener } from './events/listeners/user-created-listener';
import { UserUpdatedListener } from './events/listeners/user-updated-listener';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)

app.use(currentUser);

app.use(addUnitRouter);
app.use(unitsListRouter);
app.use(listPropertiesRouter); 
app.use(showUnit);
app.use(deleteUnit);

app.get('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    //check that env variables are defined
     if (!process.env.JWT_KEY) {
         throw new Error('JWT_KEY must be defined');
     }
     if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
    
    try {
        await natsWraper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsWraper.client.on('close', () => {
            console.log('NATs connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWraper.client.close());
        process.on('SIGTERM', () => natsWraper.client.close());

        new PropertyCreatedListener(natsWraper.client).listen();
        new OwnerCreatedListener(natsWraper.client).listen();
        new PropertyDeletedListener(natsWraper.client).listen();
        new UserCreatedListener(natsWraper.client).listen();
        new UserUpdatedListener(natsWraper.client).listen();
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongoDB');
    } catch(err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log("listening at port: 3000!!!")
    });
};

start();