import fs from "fs";
import { join } from "path";
import db from "../utils/database";

async function seed() {

  const stationsDetailsPath = join("./files/station-details");
  const stationDetailsFiles = fs.readdirSync(stationsDetailsPath);

  const journeyDetailsPath = join("./files/journey-details");
  const journeyDetailsFiles = fs.readdirSync(journeyDetailsPath);


  // for (const file of stationDetailsFiles) {
  //   console.log(file)
  //   const out = await db.$queryRawUnsafe(
  //     `\copy stationDetails from '${join(stationsDetailsPath,file)}' csv header`
  //   );

  // }

  // for (const file of journeyDetailsFiles) {
  //   await db.$queryRawUnsafe(
  //     `COPY "journey" ("departure","return","departure_station_id","departure_station_name","return_station_id","return_station_name","covered_distance","duration") from '/files/journey-details/2021-05.csv' csv header`
  //   );
  //   console.log(file);
  // }

  const rec = await db.journey.deleteMany({
    where: {
      OR: [
        {
          covered_distance: {
            lt: 10,
          },
        },
        { covered_distance: null },
        {
          duration: {
            lt: 10,
          },
        },
      ],
    },
  });

  console.log(rec);
}

async function main() {
  try {
    await seed();
  } catch (e) {
    console.log(e);
  }
}

main();
