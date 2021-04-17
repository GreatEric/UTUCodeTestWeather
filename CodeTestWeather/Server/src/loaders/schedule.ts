import schedule from "node-schedule"
import {RxHR} from "@akanass/rx-http-request";
import Logger from './logger';

export default async () => {
  const wordSchedule = async ()=>{

    /*Timed task to get weather data every minute*/
    schedule.scheduleJob('0 */1 * * * ?',()=>{
      RxHR.get('http://localhost:8282/testGet').subscribe(
        (data) => {
          if (data.response.statusCode === 200) {
            console.log('scheduleCronstyle:',data.response.body);
          }
        },
        (err) => Logger.error(err)
      );
    });
  }
  return wordSchedule;
}