import { APP_PORT } from '@/config';
import { logger } from '@/utils/logger';

export const start = async (): Promise<void> => {
  logger.info('Starting server...');

  logger.info(`Server started on port ${APP_PORT}`);
};
