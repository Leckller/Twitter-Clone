import express from "express";
import router from "./routes";
import cors from 'cors';
require('express-async-errors');

export default class App {
  public app = express()

  constructor() {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }))

    // index router
    this.app.use(router);
  }

}

const { app } = new App();

export { app };