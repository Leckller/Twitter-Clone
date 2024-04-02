import express, { Application } from "express";
import routes from './routes';
import middlewares from "./middlewares";

const app = express();

app.use(express.json());

app.use('/user', routes.User);
app.use('/login', routes.Login);

app.use(middlewares.token as Application);

app.use('/post', routes.Post);

export default app;