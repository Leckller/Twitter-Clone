import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '../index';

class SequelizeLike extends Model<InferAttributes<SequelizeLike>, InferCreationAttributes<SequelizeLike>> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare post_id: number;
}

SequelizeLike.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'likes',
  timestamps: false
});

export default SequelizeLike;