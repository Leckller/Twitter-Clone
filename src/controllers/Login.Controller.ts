import { Request, Response } from "express";
import services from "../services";
import utils from "../utils";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await services.Login.validateLogin({ email, password });

  if ('status' in userExists) {
    return res.status(userExists.status).json({ message: userExists.data.message })
  }
  try {

    const token = utils.jwt.sign({ email, id: userExists.id });

    res.status(200).json({ token });

  } catch (err) {
    return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
    // continuo sem saber como disparar um erro p testar isso aqui
  }

}

export default { login }