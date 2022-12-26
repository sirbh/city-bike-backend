import express, { Express,Request,Response } from "express";
import * as env from "dotenv"
import cors from 'cors'
import journeyRoutes from './router/journey'

env.config()
const app: Express = express();

app.use(cors())
app.use(express.json())
app.use(journeyRoutes)

const PORT = process.env.PORT

app.listen(PORT)
