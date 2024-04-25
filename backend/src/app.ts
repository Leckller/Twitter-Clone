import express from "express";
import router from "./routes";
require('express-async-errors');

export default class App {
  public app = express()

  constructor() {
    this.app.use(express.json());

    // index router
    this.app.use(router);
  }

}

const { app } = new App();

export { app };