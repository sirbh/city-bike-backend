import db from "../../utils/database";

const searchStation = async (searchQuery: string) => {
  const stationsDetails = await db.stationDetails.findMany({
    where: {
      name: {
        startsWith: searchQuery,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      station_id: true,
    },
    take: 5,
    orderBy: {
      name: "asc",
    },
  });
  return stationsDetails;
};

const getStationDetails = async (id: string, station_id: string) => {
  const _id = parseInt(id);
  const _station_id = parseInt(station_id);

  const data = await db.$transaction([
    db.stationDetails.findUniqueOrThrow({
      where: {
        id: _id,
      },
    }),
    db.journey.count({
      where: {
        departure_station_id: _station_id,
      },
    }),
    db.journey.count({
      where: {
        return_station_id: _station_id,
      },
    }),
    db.journey.aggregate({
      _avg: {
        covered_distance: true,
      },
      where: {
        departure_station_id: _station_id,
      },
    }),
    db.journey.aggregate({
      _avg: {
        covered_distance: true,
      },
      where: {
        return_station_id: _station_id,
      },
    }),
  ]);

  return {
    ...data[0],
    total_departures: data[1],
    total_return: data[2],
    avg_departure_distance: data[3]._avg.covered_distance,
    avg_return_distance: data[4]._avg.covered_distance,
  };
};

const getStationList = async (page: string, totalRecords: string) => {
  const _page = parseInt(page);
  const _totalRecords = parseInt(totalRecords);

  const stations = await db.$transaction([
    db.stationDetails.count(),
    db.stationDetails.findMany({
      take: _totalRecords,
      skip: (_page - 1) * _totalRecords,
      select: {
        name: true,
        station_id: true,
        id: true,
      },
    }),
  ]);

  return {
    totalRecords: stations[0],
    stations: stations[1],
  };
};

const getPopularStations = async (journey_type: string) => {
  const _journey_type: "departure_station_name" | "return_station_name" =
    journey_type === "ret"
      ? "return_station_name"
      : "departure_station_name";
  const stations = await db.journey.groupBy({
    by: [_journey_type],
    _sum: {
      covered_distance: true,
    },
    orderBy: {
      _sum: {
        covered_distance: "desc",
      },
    },
    take: 5,
  });

  return stations;
};

export { searchStation, getStationDetails, getStationList, getPopularStations };
