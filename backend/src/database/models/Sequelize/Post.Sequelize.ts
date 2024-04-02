import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '../index';

class SequelizePost extends Model<InferAttributes<SequelizePost>, InferCreationAttributes<SequelizePost>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare postId: number;
  declare content: string;
  declare posted: Date;
  declare repost: boolean;
}

SequelizePost.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
  content: { type: DataTypes.STRING, allowNull: false },
  postId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, field: 'post_id' },
  userId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, field: 'user_id' },
  posted: { type: DataTypes.INTEGER, allowNull: false, defaultValue: new Date() },
  repost: { type: DataTypes.INTEGER, allowNull: false, defaultValue: false },
}, {
  sequelize: db,
  tableName: 'posts',
  underscored: true,
  timestamps: false,
})

export default SequelizePost;