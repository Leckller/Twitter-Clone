import { Request, Response } from "express";
import services from "../services";
import UserModel from "../database/models/User.model";
import utils from '../utils';
import { Envs } from "../middlewares/token.Middleware";

const createUser = async (req: Request, res: Response) => {
  const { email, endereco, name, password, pictureUrl } = req.body;
  const validateFields = await services.User.validateUserFields({
    email, endereco, name, password
  });
  if (validateFields) {
    return res.status(validateFields.status).json({ message: validateFields.data.message });
  }
  else {
    try {
      const create = await UserModel.create({
        email, endereco, name,
        password, pictureUrl: pictureUrl ? pictureUrl : 'defaultPicture'
      });
      const token = utils.jwt.sign({ email, id: create.dataValues.id });

      return res.status(201).json({ token })
    } catch (err) {
      return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
    }
  }
};


const getUser = async (req: Request & Envs, res: Response) => {
  const user = req.envs;

  res.status(200).json(user);
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await services.User.validateLogin({ email, password });

  if ('status' in userExists) {
    return res.status(userExists.status).json({ message: userExists.data.message })
  }
  try {

    const token = utils.jwt.sign({ email, id: userExists.id });
    res.status(200).json({ token });

  } catch (err) {
    return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
  }

}

export default { createUser, getUser, loginUser };