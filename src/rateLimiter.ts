import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from './errors/AppError';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiterOptions = {
  storeClient: redisClient,
  keyPrefix: '@AppRateLimit',
  points: 5,
  duration: 1,
};

const limiter = new RateLimiterRedis(limiterOptions);

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const rateLimiterRes = await limiter.consume(request.ip);

    const headers = {
      'Retry-After': rateLimiterRes.msBeforeNext / 1000,
      'X-RateLimit-Limit': limiterOptions.points,
      'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext),
    };

    response.set(headers);

    return next();
  } catch {
    throw new AppError('Too many requests', 429);
  }
}
