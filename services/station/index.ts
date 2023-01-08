import { Prisma } from "@prisma/client";
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

const getStationDetails = async (station_id: string) => {
  const _station_id = parseInt(station_id);

  const data = await db.$transaction([
    db.stationDetails.findFirstOrThrow({
      where: {
        station_id: _station_id,
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
    db.journey.groupBy({
      by: ["return_station_id", "return_station_name"],
      _count: {
        departure_station_id: true,
      },
      where: {
        departure_station_id: _station_id,
      },
      orderBy: {
        _count: {
          departure_station_id: "desc",
        },
      },
      take: 5,
    }),
    db.journey.groupBy({
      by: ["departure_station_id", "departure_station_name"],
      _count: {
        return_station_id: true,
      },
      where: {
        return_station_id: _station_id,
      },
      orderBy: {
        _count: {
          return_station_id: "desc",
        },
      },
      take: 5,
    }),
  ]);

  return {
    ...data[0],
    total_departures: data[1],
    total_return: data[2],
    avg_departure_distance: data[3]._avg.covered_distance,
    avg_return_distance: data[4]._avg.covered_distance,
    popular_return_station: data[5].map((station) => {
      return {
        name: station.return_station_name,
        station_id: station.return_station_id,
      };
    }),
    popular_departure_station: data[6].map((station) => {
      return {
        name: station.departure_station_name,
        station_id: station.departure_station_id,
      };
    }),
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
      },
    }),
  ]);

  return {
    totalRecords: stations[0],
    stations: stations[1],
  };
};

const getPopularStations = async (journey_type: string) => {
  const _journey_type: Prisma.JourneyScalarFieldEnum[] =
    journey_type === "ret"
      ? ["return_station_name", "return_station_id"]
      : ["departure_station_name", "departure_station_id"];
  const stations = await db.journey.groupBy({
    // by: _journey_type,
    by: _journey_type,
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

  return stations.map((station) => {
    {
      if (journey_type === "ret") {
        return {
          name: station.return_station_name,
          station_id: station.return_station_id,
        };
      } else {
        return {
          name: station.departure_station_name,
          station_id: station.departure_station_id,
        };
      }
    }
  });
};

export { searchStation, getStationDetails, getStationList, getPopularStations };
