import 'dotenv/config';
import express, { type Express } from 'express';
import {
  verifyKeyMiddleware
} from 'discord-interactions';
import { checkStatus, initPrevData } from './utils';
import logger from "morgan"
import controller from "./controller"
import db from "./db"
import { initModels } from "./models/index"


// Create an express app
const app: Express = express();
// Get port, or default to 3000
const PORT: number = Number(process.env.PORT) || 3000;

initModels(db);
initPrevData();

setInterval(checkStatus, 10000);
// app.use(logger("dev"));
// app.set("trust proxy", true);
/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), controller.postInteractions);

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
