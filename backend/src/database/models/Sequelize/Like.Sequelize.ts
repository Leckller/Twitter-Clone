import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '../index';

class SequelizeLike extends Model<InferAttributes<SequelizeLike>, InferCreationAttributes<SequelizeLike>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare postId: number;
}

SequelizeLike.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  postId: { type: DataTypes.INTEGER, allowNull: false, field: 'post_id' },
  userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'likes',
  timestamps: false
});

export default SequelizeLike;