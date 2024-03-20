import UserModel from "../database/models/User.model";
import { ServiceResponse, ServiceResponseError } from "../types/Services.types";
import { User } from "../types/users.types";

const validateLogin = async (body: { email: string, password: string })
  : Promise<ServiceResponse<ServiceResponseError> | User> => {
  const { email, password } = body;

  if (!email || !password) {
    return { status: 400, data: { message: 'Preencha todos os campos' } }
  }

  const loginExists = await UserModel.findOne({ where: { email, password } })

  if (!loginExists || password !== loginExists.dataValues.password) {
    return { status: 401, data: { message: 'Senha ou Email inválidos' } }
  }

  return loginExists.toJSON();
}

export default { validateLogin };