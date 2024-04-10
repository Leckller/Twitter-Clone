import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '../index';

class SequelizeLike extends Model<InferAttributes<SequelizeLike>, InferCreationAttributes<SequelizeLike>> {
  declare id: CreationOptional<number>;
  declare followedId: number;
  declare followingId: number;
}

SequelizeLike.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  followedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'followed_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      key: 'id', model: 'users'
    }
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'following_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      key: 'id', model: 'users'
    }
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'followers',
  timestamps: false
});

export default SequelizeLike;