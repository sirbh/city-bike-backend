# CITY BIKE APP BACKEND
## About

This repo serve as backend for the city bike front end. More details about the features can found on the following url:

https://github.com/sirbh/city-bike-app





## Tech

NodeJS
ExpressJS
PostgreSQL DB
Prisma ORM

## How to run?


### With Docker


1. Clone the repo using ``` git clone https://github.com/sirbh/city-bike-backend.git```.
2. Run ```docker-compose up``` in the repo
3. Go to ```http://localhost:8080/page=1&totalRecords=10&station_id=94&journey_type=dep``` and check if you see json object.
4. If json object was seen on the above URL that means backend is running fine. Other wise run ```docker system prune``` and again follow steps 1. to 3 or follow without docker instructions.
5. Go to frontend repo: https://github.com/sirbh/city-bike-app and follow steps there to run front end

### Without Docker

1. Download postgres database from https://www.postgresql.org/download/.
2. Install it and make a database city_bike_db.
3. clone the repo using ``` git clone https://github.com/sirbh/city-bike-backend.git```.
4. make a ```.env``` file.
5. Provide a variable name ```DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:<PORT>/city_bike_db?schema=public"```
6. In the project directory run ```npm i```
7. Then run ```npx prisma generate```
8. To run migration run```npx prisma migrate dev```
9. After this to seed the database run ```npx prisma db seed```
10. Now finally to run the app use ```npm run start``` and check if you see any JSON out on ```http://localhost:8080/page=1&totalRecords=10&station_id=94&journey_type=dep```
11. Go to frontend repo: https://github.com/sirbh/city-bike-app and follow steps there to run front end

