import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { User } from "../../types/users.types";
import db from './index';

export type UserWithOptionalId = Optional<User, 'id'>;
export type UserSequelizeModel = Model<User, UserWithOptionalId>;

type UserSequelizeModelCreate = ModelDefined<User, UserWithOptionalId>;

const UserModel: UserSequelizeModelCreate = db.define('user', {
  email: DataTypes.STRING,
  endereco: DataTypes.STRING,
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  pictureUrl: DataTypes.BLOB
}, {
  tableName: 'users',
  timestamps: false,
  underscored: true
})