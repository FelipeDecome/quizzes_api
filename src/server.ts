import 'reflect-metadata';

import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import routes from './routes';

import './typeorm';

const app = express();

app.use(json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) =>
  response.status(500).json(err),
);

app.listen(3333, () => {
  console.log(`🚀 Server started on port: 3333`);
});
