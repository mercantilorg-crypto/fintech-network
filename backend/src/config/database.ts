import mongoose from 'mongoose';
import { env } from './env';
import { logger } from './logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongo.uri);
    logger.info('MongoDB connection established');
  } catch (error) {
    logger.error('MongoDB connection failed', { error });
    throw error;
  }
};
