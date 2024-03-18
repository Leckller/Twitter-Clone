import { NextFunction, Request, Response } from "express";
import util from "../utils";
import UserModel from "../database/models/User.model";

const extractToken = (token: string) => token.split(' ')[1];

const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { auth } = req.headers;

  if (!auth) {
    return res.status(401).json({ message: 'Token é obrigatório' })
  }

  const token = extractToken(`${auth}`);

  try {
    const decoded = await util.jwt.verify(token);
    const user = await UserModel.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token Inválido' });
  }

}

export default tokenMiddleware;