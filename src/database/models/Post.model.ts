import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Post } from '../../types/posts.types';

export type PostWithNoId = Optional<Post, 'id'>;
export type PostSequelizeModel = Model<Post, PostWithNoId>;

type PostSequelizeModelCreate = ModelDefined<Post, PostWithNoId>;

const PostModel: PostSequelizeModelCreate = db.define('post', {
  content: DataTypes.STRING,
  likes: DataTypes.INTEGER,
  posted: DataTypes.DATE,
  userId: DataTypes.INTEGER,
}, {
  tableName: 'posts',
  underscored: true,
  timestamps: false,
});

export default PostModel;