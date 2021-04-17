import winston from 'winston';
import config from '../config';

/**
 * Log Module
 * Config log output format and log output location
 *
 * @author: Eric
 * @date 15/04/2021 8:30 pm
 */

const transports = [];

//Set Log Location
if(process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )

  transports.push(
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: config.logs.timefmt
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports
});

export default LoggerInstance;