import { Request, Response } from "express";
import services from "../services";

const createUser = async (req: Request, res: Response) => {
  const { email, endereco, name, password, pictureUrl } = req.body;
  const validateUser = await services.User.validateUser({ email, endereco, name, password });
  console.log(validateUser)
  if (validateUser) {
    return res.status(validateUser.status).json({ message: validateUser.data });
  }

  else {
    const create = await services.User.createUser({ email, endereco, name, password, pictureUrl });

    res.status(create.status).json({ data: create.data });
  }
};

export default { createUser };