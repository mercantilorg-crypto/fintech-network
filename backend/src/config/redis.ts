import Redis from 'ioredis';
import { env } from './env';
import { logger } from './logger';

export const redisClient = new Redis(env.redis.url);

redisClient.on('connect', () => {
  logger.info('Redis connection established');
});

redisClient.on('error', (error) => {
  logger.error('Redis connection error', { error });
});
