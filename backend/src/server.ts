import { env } from './config/env';
import { connectDatabase } from './config/database';
import { logger } from './config/logger';
import { createApp } from './app';
import './config/redis';

const bootstrap = async (): Promise<void> => {
  await connectDatabase();

  const app = createApp();
  app.listen(env.app.port, () => {
    logger.info(`Server listening on port ${env.app.port}`);
  });
};

void bootstrap();
