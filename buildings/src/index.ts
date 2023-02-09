import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@ampdev/common';

import { createBuildingRouter } from './routes/add-building';
import { showBuildingRouter } from './routes/show-building';
import { updateBuildingRouter } from './routes/update-building';
import { listBuildingsRouter } from './routes/list-building';

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

app.use(createBuildingRouter);
app.use(showBuildingRouter);
app.use(updateBuildingRouter);
app.use(listBuildingsRouter);

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
    
    try {
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