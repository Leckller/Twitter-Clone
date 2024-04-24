import { NextFunction, Request, Response } from "express";
import util from "../utils";
import UserModel from "../database/models/User.model";

const extractToken = (token: string) => token.split(' ')[1];

export type Envs = {
  envs: { email: string, tagName: string, customName: string, id: number, description: string, picture: string }
}

const tokenMiddleware = async (req: Request & Envs, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token é obrigatório' })
  }

  const token = extractToken(`${authorization}`);

  try {
    const decoded = util.jwt.verify(token);
    const user = await new UserModel().userExists(decoded.email, decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Token Inválido' });
    }

    const { email, tagName, customName, id, description, picture } = user;

    req.envs = { email, tagName, customName, id, description, picture };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token Inválido' });
  }

}

export default tokenMiddleware;