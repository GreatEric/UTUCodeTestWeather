import dotenv from 'dotenv';

/**
 * Config Module
 * Initialize application parameters
 *
 * @author: Eric
 * @date 15/04/2021 8:33 pm
 */

//set default ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envSettings = dotenv.config();
if (envSettings.error) {
  throw new Error(".env file not found");
}

export default {
  /**
   * Application Port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Database Connection Url
   */
  dbconfig: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pwd: process.env.DB_PASS,
    schema: process.env.DB_SCHEMA,
    enableDebug: (process.env.DB_DEBUG==="true"),
    poolMax: process.env.DB_POOL_MAX,
    poolMin: process.env.DB_POOL_MIN,
    poolIdle: process.env.DB_POOL_IDLE,
    poolAcquire: process.env.DB_POOL_ACQUIRE
  },

  redisconfig: {
    port: process.env.REDIS_PORT
  },

  /**
   * Log Level
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
    timefmt: process.env.LOG_LEVEL
  },

  /**
   * API Prefix
   */
  api: {
    prefix: process.env.API_PREFIX,
  },

  /**
   * Websocket Config
   */
  wsconfig: {
    port: process.env.WS_PORT
  }
};
