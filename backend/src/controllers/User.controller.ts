import { Request, Response } from "express";
import { User } from "../types/users.types";
import UserService from "../services/User.Service";

export default class UserController {
  private service = new UserService();

  async createUser(req: Request, res: Response) {
    const { customName, description, email, password, picture, tagName }: Omit<User, 'id'> = req.body;
    const { data, status } = await this.service.newUser({ customName, description, email, password, picture, tagName });
    res.status(status).json(data);
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const { data, status } = await this.service.loginUser(email, password);

    res.status(status).json(data);
  }

}