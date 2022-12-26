import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { searchStation } from "../../services/station";

const station = express.Router();
type IQuery = {
    searchQuery:string
}

station.get('/search', async (req: Request<{},{},{},IQuery>, res: Response) => {
    console.log('ee')
    const searchQuery = req.query.searchQuery;
    
    try {
      const stations = await searchStation(searchQuery);
      res.contentType("application/json; charset=utf-8");
      res.send(stations);
    } catch (e) {
      res.status(400).send("invalid request");
    }
  })

export default station