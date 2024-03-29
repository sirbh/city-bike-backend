# CITY BIKE APP BACKEND
## About

This repo serve as backend for the city bike front end. More details about the features can be found on the following url:

https://github.com/sirbh/city-bike-app





## Tech

- NodeJS
- ExpressJS
- PostgreSQL DB
- Prisma ORM

## How to run?


### With Docker


1. Clone the repo using ``` git clone https://github.com/sirbh/city-bike-backend.git```.
2. Create folder ```files``` inside project directory. And Inside ```files``` create 2 folder ```journey-details``` and  ```station-details```.
3. Inside ```files/journey-details``` in project directory (inside city-bike-backend folder) add the following csv.
   * <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
   * <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
   * <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>
4. Inside ```files/station-details``` in project directory (inside city-bike-backend folder) add the following csv.
   * Dataset: <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>
5. Run ```docker-compose up``` in the repo to run backend
6. Go to frontend repo: https://github.com/sirbh/city-bike-app and follow steps there to run frontend

### Without Docker

1. Download postgres database from https://www.postgresql.org/download/.
2. Install it and make a database city_bike_db.
3. clone the repo using ``` git clone https://github.com/sirbh/city-bike-backend.git```.
4. make a ```.env``` file.
5. Provide a variable name ```DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:<PORT>/city_bike_db?schema=public"```
6. In the project directory run ```npm i```
7. Then run ```npx prisma generate```
8. Create folder ```files``` inside project directory. And Inside ```files``` create 2 folder ```journey-details``` and  ```station-details```.
9. Inside ```files/journey-details``` in project directory (inside city-bike-backend folder) add the following csv.
   * <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
   * <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
   * <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>
10. Inside ```files/station-details``` in project directory (inside city-bike-backend folder) add the following csv.
   * Dataset: <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>
11. Run ```npm run build```.
12. Now finally to run the app use ```npm run start```
13. Go to frontend repo: https://github.com/sirbh/city-bike-app and follow steps there to run front end

