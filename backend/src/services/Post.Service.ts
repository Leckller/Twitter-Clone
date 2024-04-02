import UserModel from "../database/models/User.model"
import { ServiceResponse, ServiceResponseError } from "../types/Services.types"

const validateNewPost = (body: { content: string })
  : ServiceResponse<ServiceResponseError> | false => {
  const { content } = body;

  if (!content || content.length < 1) {
    return { status: 411, data: { message: 'Seu post deve ter pelo menos um caractere' } }
  }

  if (content.length > 256) {
    return { status: 411, data: { message: 'Seu post atingiu o limite de 256 caracteres' } }

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
