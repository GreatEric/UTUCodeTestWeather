import { Sequelize } from 'sequelize-typescript'
import config from '../config';

/**
 * Init Sequelize
 *
 * @author: Eric
 * @date 15/04/2021 10:03 pm
 */

export default async (): Promise<Sequelize> => {
  const sequelize = new Sequelize(config.dbconfig.schema, config.dbconfig.user, config.dbconfig.pwd, {
    host: config.dbconfig.host,
    dialect: 'mysql',
    pool: {
      max: parseInt(config.dbconfig.poolMax,10),
      min: parseInt(config.dbconfig.poolMin,10),
      idle: parseInt(config.dbconfig.poolIdle,10),
      acquire: parseInt(config.dbconfig.poolAcquire,10)
    }
  })
  return sequelize;
};