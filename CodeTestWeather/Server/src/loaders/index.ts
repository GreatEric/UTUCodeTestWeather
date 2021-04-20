import expressLoader from './express';
import dependenciesInjector from './dependenciesInjector';
import dbSequelize from './sequelize'
import redisClient from './redis'
import workSchedual from './schedule'
import websocket from './websocket'
import Logger from './logger';
import User from "../models/user";
import Location from "../models/location";
import './events';

/**
 * Module Loader Manager
 *
 * @author: Eric
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

  const userModel = {
    name: 'userModel',
    model: User(sequelize)
  };

  const locationModel = {
    name: 'locationModel',
    model: Location(sequelize)
  }

  await dependenciesInjector({
    sequelize,
    redis,
    models: [
      userModel,
      locationModel
    ],
  });
  Logger.info('✌ Dependency Injector loaded');

  await websocket({ app: expressApp });

  await expressLoader({ app: expressApp });
  Logger.info('✌ Express loaded');

  await workSchedual();
};
