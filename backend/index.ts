import express, { Router } from 'express';
import mongoose from 'mongoose';
import Logging from './src/library/logging';
import MiddlewareLogger from './src/middleware/middlewareLogger';
import authRouters from './src/routers/auth';
import userRouters from './src/routers/user';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const port: number = 4000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/new-database?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    Logging.info('Connected to mongoDB');
  })
  .catch((error) => {
    Logging.error('Unable to connect: ');
    Logging.error(error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (rep, res) => {
  res.send('welcome nodejs');
});

// middleware
app.use(MiddlewareLogger);

//router
app.use('/auth', authRouters);
app.use('/user', userRouters);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
