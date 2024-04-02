import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { User } from '../../types/users.types';

export type UserWithNoId = Optional<User, 'id'>;
export type UserSequelizeModel = Model<User, UserWithNoId>;

type UserSequelizeModelCreate = ModelDefined<User, UserWithNoId>;

const UserModel: UserSequelizeModelCreate = db.define('user', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  endereco: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  pictureUrl: { type: DataTypes.STRING, allowNull: true, defaultValue: 'defaultPicture' },
}, {
  tableName: 'users',
  timestamps: false,
});

export default UserModel;