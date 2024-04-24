import { Optional } from 'sequelize';
import { User as UserType } from '../../types/users.types'
import SequelizeUser from "./Sequelize/User.Sequelize";
import jwt from '../../utils/jwt'


interface userMethods {
  createUser(fields: Optional<UserType, 'id'>): Promise<UserType>
  findUserByEmail(email: string): Promise<UserType | undefined>
  findUserByTag(tagName: string): Promise<UserType | undefined>
}

type ErrorM = { message: string };

export default class UserModel implements userMethods {
  private db = SequelizeUser;

  async findUserByEmail(email: string): Promise<UserType | undefined> {
    const dbData = await this.db.findOne({ where: { email } });
    if (!dbData) return undefined;
    return dbData.dataValues;
  }

  async findUserByTag(tagName: string): Promise<UserType | undefined> {
    const dbData = await this.db.findOne({ where: { tagName } });
    if (!dbData) return undefined;
    return dbData.dataValues;
  }

  async createUser(fields: Optional<UserType, 'id'>): Promise<UserType> {
    const { customName, description, email, password, picture, tagName } = fields;

    const createUser = await this.db.create({ customName, description, email, password, picture, tagName });

    return createUser.dataValues;
  }
}