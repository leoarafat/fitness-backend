import { createServer } from 'http';
import mongoose from 'mongoose';
import { app } from './app';
import config from './config/index';
import initializeSocketIO from './socket/socket';
import { errorLogger, logger } from './shared/logger';
const server = createServer(app);
initializeSocketIO(server);
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

// let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('DB Connected on Successfully');
    const port =
      typeof config.port === 'number' ? config.port : Number(config.port);
    server.listen(port, config.base_url, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(error);
    throw error;
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main().catch(err => errorLogger.error(err));

process.on('SIGTERM', () => {
  console.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
