import schedule from "node-schedule"
import {RxHR} from "@akanass/rx-http-request";
import Logger from './logger';
import {Container} from "typedi";
import {ModelCtor} from "sequelize-typescript";
import {RedisClient} from "redis";

export default async () => {
  const locationModel: ModelCtor = Container.get('locationModel');
  const redis: RedisClient = Container.get('redis');

  /*Timed task: Get city weather data every minute*/
  const minuteSchedual = schedule.scheduleJob('0 */1 * * * ?',()=>{
    locationModel.findAll({
      attributes: ['city_name', 'region_code', 'country_code','lat','lon'],
      raw: true
    }).then((res:any)=>{
      res.forEach(l=>{
        if(l){
          const url1 = `http://api.openweathermap.org/data/2.5/weather?lat=${l.lat}&lon=${l.lon}&appid=66283118c130eb1fe0698a4a91ad3202&units=metric`;
          const url2 = `http://api.openweathermap.org/data/2.5/weather?q=${l.city_name},${l.region_code},${l.country_code}&appid=66283118c130eb1fe0698a4a91ad3202&units=metric`;
          RxHR.get(url1).subscribe(
            (data) => {
              if (data.response.statusCode === 200) {
                let key = `${l.city_name}_${l.country_code}`;
                key = key.replace(/\s+/g,"_");

                const { weather } = JSON.parse(data.response.body);
                const { main } = JSON.parse(data.response.body);

                let redisData = {
                  desc: weather[0].description,
                  temp: main.temp,
                  temp_min: main.temp_min,
                  temp_max: main.temp_max
                }
                redis.set(key,JSON.stringify(redisData));
              }
            },
            (err) => Logger.error(err)
          );
        }
      })
    });
  });
}