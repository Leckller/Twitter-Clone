import { User } from "../../src/types/users.types";

const invalidFields = { email: 'ruy@gmail.com', invalidField: 'great test!' }
const validFields = { email: 'ruy@gmail.com', password: 'badPassword' };
const validLogin = { email: 'ruy@gmail.com', password: 'greatPassword' };

const mockResolves: Omit<User, 'id'> = {
  email: 'ruy@gmail.com', password: 'greatPassword',
  endereco: 'xesque', name: 'ruyzada', pictureUrl: 'defaultPicture'
};

export default {
  invalidFields, validFields, validLogin,
  mockResolves
}