import 'reflect-metadata';
import 'dotenv/config';

import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';
import '../typeorm';
import '@shared/containers';
import { appErrorHandling } from './middlewares/appErrorHandling';

const app = express();

app.use(json());
app.use(cors());
app.use(rateLimiter);
app.use(routes);
app.use(appErrorHandling);

export default app;
