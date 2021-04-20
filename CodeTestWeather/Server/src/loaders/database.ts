import mysql, {Pool, PoolConfig} from "mysql"
import config from '../config';

/**
 * Mysql Connection Pool
 *
 * @author: Eric
 */

export default async (): Promise<Pool> => {
  const dbConfig: PoolConfig = {
    host: config.dbconfig.host,
    port: parseInt(config.dbconfig.port,10),
    user: config.dbconfig.user,
    password: config.dbconfig.pwd,
    database: config.dbconfig.schema,
    debug: config.dbconfig.enableDebug
  }

  const pool = await mysql.createPool(dbConfig);
  return pool;
};