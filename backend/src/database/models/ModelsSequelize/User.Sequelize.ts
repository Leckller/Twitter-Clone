import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from '../index';
import { User } from '../../../types/users.types';

export type UserWithNoId = Optional<User, 'id'>;
export type UserModelType = Model<User, UserWithNoId>;
type UserSequelizeCreate = ModelDefined<User, UserWithNoId>;

const SequelizeUser: UserSequelizeCreate = db.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
  description: { type: DataTypes.STRING(200), allowNull: true, defaultValue: 'i love ruytter!' },
  tagName: { type: DataTypes.STRING(16), allowNull: false, unique: true, field: 'tag_name' },
  customName: { type: DataTypes.STRING(20), allowNull: false, field: 'custom_name' },
  password: { type: DataTypes.STRING(20), allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  email: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'users',
  timestamps: false,
});

export default SequelizeUser;
