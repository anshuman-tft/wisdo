/* eslint-disable no-unused-vars */
import {createLogger, format, transports} from 'winston';

const {combine, timestamp, json, prettyPrint} = format;
import * as winston from 'winston';

import config from '../config';

const logger = winston.createLogger({
  level: config.logger.level,
  format: combine(timestamp(), json()),
  transports: [],
  exitOnError: false,
});

if (config.logger.enabled) {
  logger.add(
    new winston.transports.Console({
      handleExceptions: true,
    }),
  );
}

export default logger;