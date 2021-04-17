import mysql, {Pool, PoolConfig} from "mysql"
import config from '../config';

/**
 * Mysql Connection Pool
 *
 * @author: Eric
 * @date 15/04/2021 10:03 pm
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

// pool.getConnection((err, conn)=>{
//   if (err) {
//
//   }
//   if (conn) {
//     logger.info("conn"+conn)
//     // var q = conn.query.apply(conn, queryArgs);
//     // q.on('end', function () {
//     //   conn.release();
//     // });
//     //
//     // events.forEach(function (args) {
//     //   q.on.apply(q, args);
//     // });
//   }
// });