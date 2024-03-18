import { Request, Response } from "express";
import services from "../services";
import UserModel from "../database/models/User.model";
import utils from '../utils';

const createUser = async (req: Request, res: Response) => {
  const { email, endereco, name, password, pictureUrl } = req.body;
  const validateFields = await services.user.validateUserFields({
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


const getUser = async (req: Request, res: Response) => {

};

export default { createUser, getUser };