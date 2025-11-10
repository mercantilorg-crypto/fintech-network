import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable ${key}`);
  }
  return value;
};

export const env = {
  app: {
    env: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 4000)
  },
  mongo: {
    uri: requiredEnv('MONGODB_URI', 'mongodb://localhost:27017/fintech_network')
  },
  redis: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379'
  },
  auth: {
    jwtSecret: requiredEnv('JWT_SECRET', 'super-secret-development'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h'
  }
};
