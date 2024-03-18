import { NextFunction, Request, Response } from "express";
import util from "../utils";
import UserModel from "../database/models/User.model";

const extractToken = (token: string) => token.split(' ')[1];

type Envs = {
  envs: { id: number, email: string }
}

const tokenMiddleware = async (req: Request & Envs, res: Response, next: NextFunction) => {
  const { auth } = req.headers;

  if (!auth) {
    return res.status(401).json({ message: 'Token é obrigatório' })
  }

  const token = extractToken(`${auth}`);

  try {
    const decoded = await util.jwt.verify(token);
    const user = await UserModel.findOne({ where: { email: decoded.email, id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.envs = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token Inválido' });
  }

}

export default tokenMiddleware;