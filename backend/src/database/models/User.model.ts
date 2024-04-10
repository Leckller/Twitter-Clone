import SequelizePost from "./Sequelize/Post.Sequelize";
import { User as UserType } from '../../types/users.types'

interface userMethods {
  createUser(fields: Partial<UserType>): UserType
  loginUser(email: string, password: string): UserType
}

export default class UserModel implements userMethods {
  private db = SequelizePost;
}