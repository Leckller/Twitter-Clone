import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '../index';

class SequelizeLike extends Model<InferAttributes<SequelizeLike>, InferCreationAttributes<SequelizeLike>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare postId: number;
  declare typePost: boolean
  declare liked: Date
}

// Onde typePost === false -> postId vai ser de um comentario

SequelizeLike.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  liked: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
  typePost: { type: DataTypes.BOOLEAN, allowNull: false, field: 'type_post' },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      key: 'id', model: 'posts'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      key: 'id', model: 'users'
    }
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'likes',
  timestamps: false
});

export default SequelizeLike;