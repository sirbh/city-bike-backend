import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { searchStation, getStationDetails, getStationList, getPopularStations } from "../../services/station";

const station = express.Router();
type SearchQuery = {
  searchQuery: string;
};

station.get(
  "/search",
  async (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
    const searchQuery = req.query.searchQuery;

    try {
      const stations = await searchStation(searchQuery);
      res.contentType("application/json; charset=utf-8");
      res.send(stations);
    } catch (e) {
      res.status(400).send("invalid request");
    }
  }
);

type StationListQuery = {
  page: string;
  totalRecords: string;
};

station.get(
  "/station-list",
  async (req: Request<{}, {}, {}, StationListQuery>, res: Response) => {
    const page = req.query.page;
    const totalRecords = req.query.totalRecords;


    try {
      const stations = await getStationList(page,totalRecords);
      res.contentType("application/json; charset=utf-8");
      res.send(stations);
    } catch (e) {
      res.status(400).send("invalid request");
    }
  }
);

type PopularStationQuery = {
  journey_type:string
};

station.get(
  "/popular-station-list",
  async (req: Request<{}, {}, {}, PopularStationQuery>, res: Response) => {

    const journey_type = req.query.journey_type

    try {
      const stations = await getPopularStations(journey_type);
      res.contentType("application/json; charset=utf-8");
      res.send(stations);
    } catch (e) {
      res.status(400).send("invalid request");
    }
  }
);

type StationDetailsQuery = {
  id: string;
  station_id: string;
};

station.get(
  "/station",
  async (req: Request<{}, {}, {}, StationDetailsQuery>, res: Response) => {
    const id = req.query.id;
    const station_id = req.query.station_id;


    try {
      const stations = await getStationDetails(id,station_id);
      res.contentType("application/json; charset=utf-8");
      res.send(stations);
    } catch (e) {
      res.status(400).send("invalid request");
    }
  }
);

export default station;
