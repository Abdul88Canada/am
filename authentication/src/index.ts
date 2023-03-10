import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError  } from '@ampdev/common';

import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { addUserRouter } from './routes/add-user';
import { getUsersRouter } from './routes/list-users';
import { showUserRouter } from './routes/show-user';
import { updateUserRouter } from './routes/update-user';

import { natsWraper } from './nats-wrapper';

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(addUserRouter);
app.use(getUsersRouter);
app.use(showUserRouter);
app.use(updateUserRouter);

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
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongoDB');
    } catch(err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log("Listening at port: 3000!!!")
    });
};

start();