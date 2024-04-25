import { Request, Response } from "express";
import { User } from "../types/users.types";
import UserService from "../services/User.Service";
import { Envs } from "../middlewares/token.Middleware";

const service = new UserService();

export default class UserController {

  async createUser(req: Request, res: Response) {
    const { customName, description, email, password, picture, tagName }: Omit<User, 'id'> = req.body;
    const { data, status } = await service.newUser({ customName, description, email, password, picture, tagName });
    res.status(status).json(data);
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const { data, status } = await service.loginUser(email, password);

    res.status(status).json(data);
  }

  async deleteUser(req: Request & Envs, res: Response) {
    const { id, email } = req.envs;
    const { data, status } = await service.deleteUser(id, email);
    res.status(status).json(data);
  }
}