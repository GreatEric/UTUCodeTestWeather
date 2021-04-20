import {Router, Request, Response, NextFunction} from 'express';
import { Container } from "typedi";
import { Logger } from "winston";
import UserService from "../../services/user";
import { IUserInputDTO} from "../../interfaces/IUser";
import { IUserLocation } from '../../interfaces/IUserLocation';
import {forkJoin, Observable} from "rxjs";

const route = Router();

export default (app: Router) => {
  const logger: Logger = Container.get('logger');
  app.use('/user', route);

  route.post(
    '/signup',
    //cors(corsOptions),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = Container.get(UserService);
        let user = req.body as IUserInputDTO;
        await userService.SignUp(user);
        return res.status(201).json(user);
      } catch (e) {
        logger.error('🔥 signup error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/addLocation',
    //cors(corsOptions),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = Container.get(UserService);
        let location = req.body as IUserLocation;
        await userService.AddLocation(location);
        return res.status(201).json(location);
      } catch (e) {
        logger.error('🔥 addLocation error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/getLocations/:device_uuid',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = Container.get(UserService);
        const locations = userService.GetLocations(req.params.device_uuid);
        locations.then((result)=>{
          return res.status(200).json(result);
        })
      } catch (e) {
        logger.error('🔥 getLocations error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/initMinuteData/:device_uuid',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = Container.get(UserService);
        const promise = userService.InitMinuteData(req.params.device_uuid);
        promise.then((tasks)=>{
          forkJoin(...tasks).subscribe(results => {
            results.forEach(r=>{
              let {data} = r;
              let {weather} = JSON.parse(data);
              let {main} = JSON.parse(data);

              r.data = {
                desc: weather[0].description,
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max
              }
            })
            res.status(200).json(results);
          });
        })
      } catch (e) {
        logger.error('🔥 getLocations error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/fetchForcast/:device_uuid',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = Container.get(UserService);
        const promise = userService.FetchForcast(req.params.device_uuid);
        promise.then((tasks)=>{
          forkJoin(...tasks).subscribe(results => {
            let datas = {};
            results.forEach(r=>{
              let { datakey } =r;
              let {forecasts} = r;
              let datalist = [];

              forecasts.forEach(f=>{
                let {dt_txt} = f;
                let {weather} = f;
                let {main} = f;

                let data = {
                  desc: weather[0].description,
                  temp: main.temp,
                  temp_min: main.temp_min,
                  temp_max: main.temp_max,
                  dt: dt_txt
                }
                datalist.push(data);
              })

              datas[datakey] = datalist;
              //r.forecasts = datalist;

            })
            res.status(200).json(datas);
          });
        })
      } catch (e) {
        logger.error('🔥 getLocations error: %o', e);
        return next(e);
      }
    },
  );
};
