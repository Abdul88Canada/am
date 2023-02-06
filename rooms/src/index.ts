import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { addRoomRouter } from './routes/addRoom';
import {roomsListRouter} from './routes/roomsList';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)

app.use(addRoomRouter);
app.use(roomsListRouter);

app.get('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    //check that env variables are defined
     if (!process.env.JWT_KEY) {
         throw new Error('JWT_KEY must be defined');
     }
    
    try {
        await mongoose.connect('mongodb://rooms-mongo-srv:27017/room');
        console.log('Connected to mongoDB');
    } catch(err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log("listening at port: 3000!!!")
    });
};

start();