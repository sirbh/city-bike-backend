import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { searchStation, getStationDetails, getStationList } from "../../services/station";

const station = express.Router();
type SearchQuery = {
  searchQuery: string;
};

station.get(
  "/search",
  async (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
    console.log("ee");
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

export default station;
