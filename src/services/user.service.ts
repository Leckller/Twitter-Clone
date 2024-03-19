import UserModel, { UserWithNoId } from "../database/models/User.model";

type ServiceResponseError = {
  message: string
}

type ServiceResponse<Data> = {
  status: number,
  data: Data
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUserFields = async (body: Omit<UserWithNoId, 'pictureUrl'>): Promise<ServiceResponse<ServiceResponseError> | false> => {
  const { email, endereco, name, password } = body;
  if (!endereco || !email || !name || !password) {
    return {
      status: 400, data: {
        message:
          `Preencha os campos ${email ? "" : 'email'}${endereco ? "" : ', endereco'}${name ? "" : ', name'}${password ? "" : ', password'}`
      }
    };
  }
  if (!emailRegex.test(email)) {
    return { status: 400, data: { message: 'Email inválido' } }
  }

  if (password.length < 8) {
    return { status: 400, data: { message: 'Sua senha deve ser maior que 8 digitos' } }
  }

  const verifyEmail = await UserModel.findOne({ where: { email } });
  const verifyEndereco = await UserModel.findOne({ where: { endereco } });

  if (verifyEmail) {
    return { status: 401, data: { message: 'Este email já possui cadastro' } }
  }
  if (verifyEndereco) {
    return { status: 401, data: { message: 'Este endereco de usuario está em uso' } }
  }

  return false;
}

export default { validateUserFields };