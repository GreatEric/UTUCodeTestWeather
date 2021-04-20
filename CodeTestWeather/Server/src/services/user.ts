import {Service, Inject, Container} from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { IUserInputDTO} from "../interfaces/IUser";
import { IUserLocation } from '../interfaces/IUserLocation';
import { EventDispatcher, EventDispatcherInterface } from "../decorators/eventDispatcher";
import {RxHR} from "@akanass/rx-http-request";
import redis from "../loaders/redis";
import {RedisClient} from "redis";
import {map} from "rxjs/operators";

@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel: ModelCtor,
    @Inject('locationModel') private locationModel: ModelCtor,
    @Inject('redis') private redis: RedisClient,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async SignUp(user: IUserInputDTO): Promise<any> {
    if(user.device_uuid){
      try {
        let u = await this.userModel.findOne({
          where: { device_uuid: user.device_uuid },
        });
        if (u === null) {
          u = await this.userModel.create(user);

          const default_location: IUserLocation = {
            device_uuid: user.device_uuid,
            city_name: user.city,
            region_code: user.region,
            country_code: user.country,
            lat: user.lat,
            lon: user.lon,
            is_default: 1
          }

          //save current location
          this.AddLocation(default_location);
          // this.eventDispatcher.dispatch(events.user.signUp, { user: u });
        } else {
          this.logger.info(`user ${user.device_uuid} has already registed!`);
        }
        return u;
      }catch (e) {
        this.logger.error(e);
        throw e;
      }
    }
  }

  public async AddLocation(location: IUserLocation): Promise<any> {
    if(location.lat && location.lon && location.device_uuid){
      try {
        let lo = await this.locationModel.findOne({ where: { device_uuid: location.device_uuid, city_name: location.city_name, country_code: location.country_code } });
        if (lo === null) {
          lo = await this.locationModel.create(location);
        } else {
          this.logger.info(`location ${location.lat},${location.lon} has already exist!`);
        }
        return lo;
      }catch (e) {
        this.logger.error(e);
        throw e;
      }
    }
  }

  public async GetLocations(device_uuid: string): Promise<any> {
    if(device_uuid){
      try {
        const locations = await this.locationModel.findAll({
          where: {
            device_uuid: device_uuid
          }
        });
        return locations;
      }catch (e) {
        this.logger.error(e);
        throw e;
      }
    }
  }

  public InitMinuteData(device_uuid: string): Promise<any>{
    let tasks$ = [];

    return new Promise((resolve, reject) => {
      this.locationModel.findAll({
        where: {device_uuid: device_uuid},
        attributes: ['city_name', 'region_code', 'country_code', 'lat', 'lon'],
        raw: true
      }).then((res: any) => {
        res.forEach(r => {
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${r.lat}&lon=${r.lon}&appid=66283118c130eb1fe0698a4a91ad3202&units=metric`;
          tasks$.push(RxHR.get(url).pipe(map(val => {
            let newData = {
              city: r.city_name,
              region: r.region_code,
              country: r.country_code,
              lat: r.lat,
              lon: r.lon,
              data: val.response.body
            }
            return newData;
          })));
        })
        resolve(tasks$)
      });
    })
  }

  public FetchForcast(device_uuid: string): Promise<any>{
    let tasks$ = [];

    return new Promise((resolve, reject) => {
      this.locationModel.findAll({
        where: {device_uuid: device_uuid},
        attributes: ['city_name', 'region_code', 'country_code', 'lat', 'lon'],
        raw: true
      }).then((res: any) => {
        res.forEach(r => {
          const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${r.lat}&lon=${r.lon}&appid=66283118c130eb1fe0698a4a91ad3202&units=metric&cnt=3`;
          tasks$.push(RxHR.get(url).pipe(map(val => {
            let newData = {
              datakey: Buffer.from(`${r.city_name}_${r.country_code}`, 'binary').toString('base64'),
              forecasts: JSON.parse(val.response.body).list
            }
            return newData;
          })));
        })
        resolve(tasks$)
      });
    })
  }
}
