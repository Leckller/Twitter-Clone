import express, { Request, Response } from "express";
import UserModel from "./database/models/User.model";

const app = express();

app.use(express.json());

app.post('/user', async (req: Request, res: Response) => {
  const teste = await UserModel.create({ email: 'oi', endereco: 'asdasd', name: 'ruy', password: 'teste!', pictureUrl: 'aaaaaaaa' });

  res.status(200).json(teste);
})

export default app;