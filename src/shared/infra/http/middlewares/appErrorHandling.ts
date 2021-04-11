import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

const appErrorHandling = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  if (err instanceof AppError)
    return response.status(err.statusCode).json({
      status: 'Client Error',
      message: err.message,
    });

  return response.status(500).json({
    status: 'Internal Server Error',
    message: err.message,
  });
};

export { appErrorHandling };
