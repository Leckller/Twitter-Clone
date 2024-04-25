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

  public createUser2: Optional<User, 'id'> = {
    customName: 'alexada',
    description: 'tropa da trindade',
    email: 'ale@gmail.com',
    password: 'senhazinha',
    picture: '',
    tagName: 'ale'
  }

  public createUser3: Optional<User, 'id'> = {
    customName: 'momo',
    description: 'i love better call saul',
    email: 'morghana@gmail.com',
    password: '123',
    picture: '',
    tagName: 'momo'
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