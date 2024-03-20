import express from "express";
import routes from './routes';

const app = express();

app.use(express.json());

app.use('/user', routes.User);
app.use('/login', routes.Login);

export default app;