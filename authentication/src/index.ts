import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError  } from '@ampdev/common';

import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

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
        await mongoose.connect('mongodb://authenication-mongo-srv:27017/auth');
        console.log('Connected to mongoDB');
    } catch(err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log("Listening at port: 3000!!!")
    });
};

start();