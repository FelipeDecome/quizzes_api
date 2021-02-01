import 'reflect-metadata';

import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import routes from './infra/http/routes';

import './infra/typeorm';
import AppError from './errors/AppError';

const app = express();

app.use(json());
app.use(routes);

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
