import UserModel from "../database/models/User.model"
import { ServiceResponse, ServiceResponseError } from "../types/Services.types"

const validateNewPost = (body: { content: string })
  : ServiceResponse<ServiceResponseError> | false => {
  if (!body.content) {
    return { status: 400, data: { message: 'Ninguém lê algo vazio!' } }
  }
  if (body.content.length < 1) {
    return { status: 400, data: { message: 'Seu post deve ter pelo menos um caractere' } }
  }

  return false
}

const enderecoExists = async (endereco: string)
  : Promise<ServiceResponse<ServiceResponseError> | false> => {
  const query = await UserModel.findOne({ where: { endereco } });

  if (!query) {
    return { status: 404, data: { message: 'Usuario não encontrado' } };
  }

  return false;
}

export default { validateNewPost, enderecoExists };
