import expressLoader from './express';
import dependenciesInjector from './dependenciesInjector';
import dbSequelize from './sequelize'
import redisClient from './redis'
import workSchedual from './schedule'
import websocket from './websocket'
import Logger from './logger';
import User from "../models/user";
import './events';

/**
 * Module Loader Manager
 *
 * @author: Eric
 * @date 15/04/2021 8:41 pm
 */
export default async ({ expressApp }) => {
  const sequelize = await dbSequelize();
  await sequelize.authenticate()
  .then(() => {
    Logger.info('✌ Sequelize loaded and Connection has been established successfully.');
  })
  .catch(err => {
    Logger.error('Unable to connect to the database:', err);
  });

  const redis = await redisClient();

  const schedule = await workSchedual();
  await schedule();

  await websocket({ app: expressApp });

  const userModel = {
    name: 'userModel',
    model: User(sequelize)
  };

  await dependenciesInjector({
    sequelize,
    redis,
    models: [
      userModel
    ],
  });
  Logger.info('✌ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌ Express loaded');
};
