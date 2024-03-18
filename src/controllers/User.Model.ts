import { Request, Response } from "express";
import { User } from "../types/users.types";
import services from "../services";

const createUser = async (req: Request, res: Response) => {
  const { email, endereco, name, password, pictureUrl } = req.body as Omit<User, 'id'>;
  const validateUser = await services.User.validateUser({ email, endereco, name, password, pictureUrl });
  if (validateUser) {
    return res.status(validateUser.status).json({ message: validateUser.data });
  }

  const create = await services.User.createUser({ email, endereco, name, password, pictureUrl });

  res.status(create.status).json({ data: create.data })
  // tem que criar o sistema jwt
}