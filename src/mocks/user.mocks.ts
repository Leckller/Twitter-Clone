import { User } from "../types/users.types";
// uso somente para construir, dpois retiro o type para conseguir usar o autocomplete
type BodyMocks = Record<string, Omit<Omit<User, 'id'>, 'pictureUrl'>>;

const bodyMocks = {
  invalidEmail: { email: 'emailInvalido', endereco: 'jhonsons', name: 'xesquedele', password: '123456789' },
  invalidPassword: { email: 'tavin@gmail.com', endereco: 'ruyzada', name: 'Ruyzinho', password: '12345678' }
};

export default { bodyMocks };