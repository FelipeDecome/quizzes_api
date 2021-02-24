import 'reflect-metadata';
import 'dotenv/config';

import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';

import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';

import '../typeorm';

const app = express();

app.use(json());
app.use(cors());
app.use(rateLimiter);

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError)
    return response.status(err.statusCode).json({
      status: 'Client Error',
      message: err.message,
    });

  return response.status(500).json({
    status: 'Internal Server Error',
    message: err.message,
  });
});

export default app;
