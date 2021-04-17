import redis from "redis"
import config from '../config';

export default async () => {
  const redisClient = redis.createClient(config.redisconfig.port);
  return redisClient;
}