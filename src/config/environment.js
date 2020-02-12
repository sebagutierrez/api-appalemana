const loggers = require('../utils/logger.utils');

let environmentFile;
switch (process.env.NODE_ENV) {
  case 'test':
    environmentFile = '.env.testing';
    break;

  case 'local':
    environmentFile = '.env.local';
    break;

  default:
    environmentFile = '.env';
    break;
}

const logger = loggers.get('app-logger');
logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
logger.info(`.env file usado: ${environmentFile}`);

require('dotenv').config({
  path: environmentFile,
});
