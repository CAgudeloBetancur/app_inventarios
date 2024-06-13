import express from 'express';
import cors from 'cors';
import { getConnection } from './db/db-connection-mongo.js';
import router from './routes/index.routes.js';

const app = express();
const port = 4000;

app.use(cors());

getConnection();

// Parseo JSON

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`App en http://localhost:${port}`);
});