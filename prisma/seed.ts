import fs from "fs";
import { join } from "path";
import db from "../utils/database";

async function seed() {
  const stationsDetailsPath = join("./files/station-details");
  const stationDetailsFiles = fs.readdirSync(stationsDetailsPath);

  const journeyDetailsPath = join("./files/journey-details");
  const journeyDetailsFiles = fs.readdirSync(journeyDetailsPath);

  for (const file of stationDetailsFiles) {
    await db.$queryRawUnsafe(
      `COPY "stationDetails" FROM '../../../../${join(stationsDetailsPath.replace('.',''),file)}' csv header`
    );
    console.log("seeded " + file);
  }

  for (const file of journeyDetailsFiles) {
    await db.$queryRawUnsafe(
      `COPY "journey" ("departure","return","departure_station_id","departure_station_name","return_station_id","return_station_name","covered_distance","duration") from '../../../../${join(journeyDetailsPath.replace('.',''),file)}' csv header`
    );
    console.log("seeded " + file);
  }

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
