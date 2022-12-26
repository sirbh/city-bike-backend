import db from "../utils/database";

import * as fs from "fs";
import * as path from "path";
import { parse, Parser } from "csv-parse";

type stationDetail = {
  FID: number;
  ID: number;
  Nimi: string;
  Namn: string;
  Name: string;
  Osoite: string;
  Adress: string;
  Kaupunki: string;
  Stad: string;
  Operaattor: string;
  Kapasiteet: string;
  x: number;
  y: number;
};

type journey = {
    Departure:Date,
    Return:Date,
    "Departure station id":number,
    "Departure station name":string,
    "Return station id":number,
    "Return station name":string,
    "Covered distance (m)":number,
    "Duration (sec.)":number

}

const csvFilePath = path.resolve("C:/Users/soura/Downloads/stations.csv");
const csvFilePath2 = path.resolve("C:/Users/soura/Downloads/2021-05.csv");

const headers = [
  "FID",
  "ID",
  "Nimi",
  "Namn",
  "Name",
  "Osoite",
  "Adress",
  "Kaupunki",
  "Stad",
  "Operaattor",
  "Kapasiteet",
  "x",
  "y",
];

const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
const fileContent2 = fs.readFileSync(csvFilePath2, { encoding: "utf-8" });

parse(
  fileContent,
  {
    delimiter: ",",
    columns: headers,
    from: 2,
    cast: (cv, context) => {
      if (context.column === "FID" || context.column === "ID") {
        return parseInt(cv);
      }
      if (context.column === "x" || context.column === "y") {
        return parseFloat(cv);
      }
      return cv.trim() ? cv : undefined;
    },
  },
  async (error, result: stationDetail[]) => {
    if (error) {
      console.error(error);
    }
    console.log("here", result);
    result.forEach(async (record) => {
      await db.stationDetails.create({
        data: {
          adress: record.Adress,
          id: record.FID,
          Kapasiteet: record.Kapasiteet,
          name: record.Name,
          namn: record.Namn,
          nimi: record.Nimi,
          osoite: record.Osoite,
          station_id: record.ID,
          x: record.x,
          y: record.y,
          kaupunki: record.Kaupunki,
          operaattor: record.Operaattor,
          stad: record.Stad,
        },
      });
    });
  }
);

// parse(
//   fileContent2,
//   {
//     delimiter: ",",
//     from: 2,
//   },
//   async (error, result:journey[]) => {
//     if (error) {
//       console.error(error);
//     }
    
//     result.forEach(async data=>{
//        await db.journey.create({data:{
//         departure:data.Departure,
//         departure_station_id:data["Departure station id"],
//         departure_station_name:data["Departure station name"],
//         duration:data["Duration (sec.)"],
//         return:data.Return,
//         return_station_id:data["Return station id"],
//         return_station_name:data["Return station name"],
//         covered_distance:data["Covered distance (m)"],
//        }})
//     })
//   }
// ).on('readable', async function(this:Parser){
//      let count = 0
//      while(count<=103){
//         const record = this.read()
//         await db.journey.create({
//           data:{
//            departure:new Date(record[0]),
//            return:new Date(record[1]),
//            departure_station_id:parseInt(record[2]),
//            departure_station_name:record[3],
//            return_station_id:parseInt(record[4]),
//            return_station_name:record[5],
//            covered_distance:parseFloat(record[6]),
//            duration:parseInt(record[7]) 
//           }
//         })
//         count++
//      }
    
//   })

