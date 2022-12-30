import { stat } from "fs";
import db from "../../utils/database";
import { searchStation } from "../station";

type IQuery = {
  page: string;
  totalRecords: string;
  sortBy?: string;
  order?: "asc" | "desc";
  station_id?:string;
  journey_type?:'dep'|'ret'
};

const SORTABLE_COLUMNS = [
  "departure_station_name",
  "return_station_name",
  "covered_distance",
  "duration",
];
const ORDER = ["asc", "desc"];
const SEARCHABLE_COLUMNS = ["departure_station_name", "return_station_name"];

const getJourney = async ({ page, order, sortBy, totalRecords, station_id,journey_type }: IQuery) => {
  const _page = parseInt(page);
  const _totalRecords = parseInt(totalRecords);

  const _orderBy: {
    [key: string]: string;
  } = {};

  const _filterBy: {
    [key: string]: number;
  } = {};

  if (order && sortBy) {
    if (SORTABLE_COLUMNS.includes(sortBy) && ORDER.includes(order)) {
      _orderBy[sortBy] = order;
    } else {
      throw {
        message: "INVALID REQUEST",
      };
    }
  } else if (order || sortBy) {
    throw {
      message: "INVALID REQUEST",
    };
  }

  if(station_id && journey_type){
    if(journey_type==='dep'){
      _filterBy['departure_station_id'] = parseInt(station_id)
    }
    else {
      _filterBy['return_station_id'] = parseInt(station_id)
    }
  }

  const journeyData = await db.$transaction([
    db.journey.count({
      where:_filterBy
    }),
    db.journey.findMany({
      take: _totalRecords,
      skip: (_page - 1) * _totalRecords,
      orderBy: _orderBy,
      where:_filterBy
    }),
  ]);


  return {
    totalRecords:journeyData[0],
    journey:journeyData[1]
  }
};

const getJourneyByStation = async (
  stationName: string,
  journeyType: string
) => {
  const _serachQuery: {
    [key: string]: string;
  } = {};
  if (journeyType === "return") {
    _serachQuery["return_station_name"] = stationName;
  } else if (journeyType === "departure") {
    _serachQuery["departure_station_name"] = stationName;
  } else {
    throw {
      message: "INVALID REQUEST",
    };
  }

  const journey = db.journey.findMany({
    where: _serachQuery,
  });

  return journey;
};

export { getJourney, IQuery, getJourneyByStation };
