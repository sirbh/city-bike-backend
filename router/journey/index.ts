import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { getJourney, IQuery } from "../../services/journey";

const journeyRouter = express.Router();

journeyRouter.get(
  "/",
  async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
    const { page, totalRecords, order, sortBy } = req.query;
    
    try {
      const journey = await getJourney({ page, totalRecords, order, sortBy });
      res.contentType("application/json; charset=utf-8");
      res.send(journey);
    } catch (e) {
      res.status(400).send("invalid request");
    }
  }
);

export default journeyRouter;
