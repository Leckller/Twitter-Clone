import UserModel, { UserSequelizeModel, UserWithOptionalId } from "../database/models/User.Model";
import { User } from "../types/users.types";

type ServiceResponseError = {
  message: string
}

type ServiceResponse<data> = {
  status: number,
  data: data
}

const validateUser = async (body: Omit<User, 'id'>)
  : Promise<ServiceResponse<ServiceResponseError> | false> => {
  if (!body.email) {
    const emailExists = await UserModel.findOne({ where: { email: body.email } });
    if (emailExists) {
      return { status: 400, data: { message: 'Este email já possui cadastro' } }
    }
    return { status: 400, data: { message: 'Insira um email' } }
  }
  if (!body.endereco) {
    const enderecoExists = await UserModel.findOne({ where: { endereco: body.endereco } });
    if (enderecoExists) {
      return { status: 400, data: { message: 'Este endereco de usuário já está sendo utilizado' } }
    }
    return { status: 400, data: { message: 'Insira um endereço de perfil' } }
  }
  if (!body.name) {
    return { status: 400, data: { message: 'Insira um nome' } }
  }
  if (!body.password) {
    return { status: 400, data: { message: 'Insira uma senha' } }
  }
  if (body.password.length < 8) {
    return { status: 400, data: { message: 'Sua senha deve ter um tamanho maior que 8 caracteres' } }
  }
  return false;
};

const createUser = async (body: UserWithOptionalId)
  : Promise<ServiceResponse<UserSequelizeModel>> => {

  const { email, endereco, name, password, pictureUrl } = body;
  const create = await UserModel.create({ email, endereco, name, password, pictureUrl });

  return { status: 201, data: create }
};

export default { createUser, validateUser }