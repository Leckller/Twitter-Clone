import { User } from "../types/users.types";
// uso somente para construir, dpois retiro o type para conseguir usar o autocomplete
type BodyMocks = Record<string, Omit<Omit<User, 'id'>, 'pictureUrl'>>;

const bodyMocks = {
  invalidFields: { email: '', endereco: '', name: '', password: '' },
  invalidEmail: { email: 'emailInvalido', endereco: 'jhonsons', name: 'xesquedele', password: '123456789' },
  invalidPassword: { email: 'teste@gmail.com', endereco: 'ruyzada', name: 'Ruyzinho', password: 'senha' },
  validFields: {
    email: 'tlgd@gmail.com', endereco: 'tomale', name: 'teste', password: '121212121212', pictureUrl: 'defaultPicture'
  }
};

export default { bodyMocks };