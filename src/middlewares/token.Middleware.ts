import { NextFunction, Request, Response } from "express";
import util from "../utils";
import UserModel from "../database/models/User.model";

const extractToken = (token: string) => token.split(' ')[1];

export type Envs = {
  envs: { id: number, email: string, endereco: string, name: string, pictureUrl: string }
}

const tokenMiddleware = async (req: Request & Envs, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token é obrigatório' })
  }

  const token = extractToken(`${authorization}`);

  try {
    const decoded = await util.jwt.verify(token);
    const user = await UserModel.findOne({ where: { email: decoded.email, id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    const { email, endereco, name, id, pictureUrl } = user.dataValues;

    req.envs = { email, endereco, name, id, pictureUrl };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token Inválido' });
  }

}

export default tokenMiddleware;