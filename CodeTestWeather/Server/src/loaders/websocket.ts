import * as WebSocket from 'ws';
import * as http from 'http';
import config from '../config';
import express from "express";
import Logger from "./logger";
import {RedisClient} from "redis";
import {Container} from "typedi";

export default ({ app }: { app: express.Application }) => {
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  const redis: RedisClient = Container.get('redis');

  wss.on('connection', (ws: WebSocket) => {
    Logger.info('✌ Websocket connected');

    ws.on('message', (message: string) => {
      let obj = JSON.parse(message);
      switch (obj.type) {
        //heartbeat health check
        case 'heartbeat':
          Logger.info(`✌ Websocket heartbeat : device [${obj.device_uuid}]`);
          break;
        case 'getMinuteData':
          obj.locations.forEach(l=>{
            let key = `${l.city}_${l.country}`;
            key = key.replace(/\s+/g,"_");

            let weather = {
              type: 'dataTransfer',
              city: l.city,
              country: l.country,
              data: '',
            }
            redis.get(key,(err,reply)=>{
              if(err){
                weather.data = JSON.stringify(err);
              }
              if(reply){
                weather.data = JSON.stringify(reply);
                ws.send(JSON.stringify(weather));
              }
            });
          })
          break;
      }
    });

    //send connection identification message
    let sysmsg: object = {
      type: 'connected',
      msg: 'Connection established.'
    }
    ws.send(JSON.stringify(sysmsg));
  });

  server.listen(config.wsconfig.port, () => {
    Logger.info(`✌ Websocket Server started on port ${config.wsconfig.port}`);
  });
};
