import db from '../index';
import SequelizeUser from "./User.Sequelize";
import { Post } from "../../../types/posts.types";
import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';

export type PostWithNoId = Optional<Post, 'id'>;
export type PostModelType = Model<Post, PostWithNoId>
type PostSequelizeCreate = ModelDefined<Post, PostWithNoId>;

const SequelizePost: PostSequelizeCreate = db.define('Post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
  content: { type: DataTypes.STRING, allowNull: false },
  posted: { type: DataTypes.INTEGER, allowNull: false, defaultValue: new Date() },
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
  tableName: 'posts',
  underscored: true,
  timestamps: false,
})

SequelizeUser.hasMany(SequelizePost, { foreignKey: 'userId', as: 'userPost' });
SequelizePost.belongsTo(SequelizeUser, { foreignKey: 'userId' });

// Unico
SequelizePost.belongsTo(SequelizeUser, { foreignKey: 'userId', as: 'postUser' });

export default SequelizePost;