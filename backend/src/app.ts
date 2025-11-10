import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { logger } from './config/logger';
import { errorHandler } from './middleware/errorHandler';
import { registerRoutes } from './routes';

export const createApp = (): express.Application => {
  const app = express();

  app.use(
    cors({
      origin: '*',
      credentials: true
    })
  );
  app.use(helmet());
  app.use(express.json());
  app.use(morgan(env.app.env === 'production' ? 'combined' : 'dev'));

  registerRoutes(app);

  app.use(errorHandler);

  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      error: { message: 'Route not found' }
    });
  });

  logger.info('Express app initialized');
  return app;
};
