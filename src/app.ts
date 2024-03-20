import express, { Request, Response } from "express";
import routes from './routes';

const app = express();

app.use(express.json());

app.use('/user', routes.User);

export default app;