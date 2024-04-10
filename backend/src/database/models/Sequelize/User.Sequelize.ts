import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '../index';

class SequelizeUser extends Model<InferAttributes<SequelizeUser>, InferCreationAttributes<SequelizeUser>> {
  declare id: CreationOptional<number>;
  declare tagName: string;
  declare customName: string;
  declare picture: string;
  declare description: string;
  declare email: string;
  declare password: string;
}

SequelizeUser.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
  description: { type: DataTypes.STRING(200), allowNull: true, defaultValue: 'i love ruytter!' },
  tagName: { type: DataTypes.STRING(16), allowNull: false, unique: true },
  customName: { type: DataTypes.STRING(20), allowNull: false },
  password: { type: DataTypes.STRING(20), allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize: db,
  tableName: 'users',
  underscored: true,
  timestamps: false,
})

export default SequelizeUser;
