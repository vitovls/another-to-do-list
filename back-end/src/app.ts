import express from 'express';
import connectToDatabase from './database/connection';

require('dotenv').config();

export default class App {
  public app: express.Application;

  public port: number;

  constructor(port = Number(process.env.PORT) || 3000) {
    this.app = express();
    this.port = port;
  }

  start() {
    connectToDatabase();
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}...`);
    });
  }
}
