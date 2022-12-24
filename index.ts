import express, { Express,Request,Response } from "express";
import * as env from "dotenv"


env.config()
const app: Express = express();

const PORT = process.env.PORT

app.listen(PORT)
