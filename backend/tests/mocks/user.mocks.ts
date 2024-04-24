import { Optional } from "sequelize";
import { User } from "../../src/types/users.types";

export default class UserMock {
  public createUser: Optional<User, 'id'> = {
    customName: 'ruyzinho',
    description: 'gosto de back end',
    email: 'ruy@gmail.com',
    password: 'umaBelaSenhaSegura',
    picture: '',
    tagName: 'ruy'
  }

  public editUser: Optional<User, 'id'> = {
    customName: 'ruyzada',
    description: 'gosto de front end',
    email: 'ruy@gmail.com',
    password: 'umapaia',
    picture: '',
    tagName: 'ruy'
  }
}