import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript'
import Logger from './logger';
import { RedisClient } from "redis";

/**
 * Dependencies Injector Manager
 *
 * @author: Eric
 * @date 15/04/2021 11:56 pm
 */
export default ({ sequelize, redis, models }: { sequelize: Sequelize; redis: RedisClient; models: { name: string; model: any }[] }) => {

  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    Container.set('sequelize', sequelize);
    Container.set('redis', redis);
    Container.set('logger', Logger);

  } catch (e) {
    Logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
