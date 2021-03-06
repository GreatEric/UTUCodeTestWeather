# UTU CodeTest Weather Application

## Description:

NodeJS weather API server with a database to provide the information needed by the weather

## Features:

- Display the name of your city with its current temperature, weather condition,
  highest/lowest temperature, as well as the weather forecast for the upcoming 3 days.
- User can search the city and save it into its shortlist.
- Switch between the shortlisted cities by swiping the screen to left or right.
- Integrate Openweather API as a third-party service which are synchronizing the weather information
  into your database via the API you provide.

## Development

Backend:
node + express + mysql + redis

node version: v14.16.1

express: ^4.17.1"

mysql: 8.0

redis: 3.0.504

Front End:
Ionic5

## UI prototyping
![avatar](https://www.imageoss.com/images/2021/04/15/UTUCodeTestWeathere15970169a3f5d2f.png)

## Database Design
![avatar](https://www.imageoss.com/images/2021/04/15/DBTables625c6c7e88ae2e0f.png)
 
## Project Plan：
- 1.UI prototyping (0.5 hour)
- 2.Database table structure design (0.5 hour)
- 3.API interface design  (0.5 hour)
- 4.NodeJS background project scaffolding  (1.5 hour)
- 5.App project scaffolding  (1.5 hour)
- 6.APP function development  (12 hour)
- 7.Smoke test  (1 hour)
- 8.Optimization (1 hour)

# Roadmap
- [x] UI prototyping
- [x] Database table structure design
- [x] API interface design
- [x] NodeJS background project scaffolding
- [x] App project scaffolding
- [x] APP function development
- [x] Smoke test
- [x] Optimization

# Test
## server: npm start

## app: ionic cordova run android

Note: 

- Please copy env-demo.txt to .env before starting the server

- You need to modify the connection address in the src/config.ts configuration file before running the app

- The database script file uses utucodetestweather-v1.1.sql


# Preview
![_2021042100115633611753c2a31bc2.png](https://www.imageoss.com/images/2021/04/20/_2021042100115633611753c2a31bc2.png)

![UTUCodeTestWeather311e060d51a4b178.gif](https://www.imageoss.com/images/2021/04/20/UTUCodeTestWeather311e060d51a4b178.gif)
