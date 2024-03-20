import { DataTypes, Model, ModelDefined, Optional } from "sequelize"
import { Post } from "../../types/posts.types"
import db from './index';

export type PostWithNoId = Optional<Post, 'id'>;
export type PostSequelizeModel = Model<Post, PostWithNoId>;

type PostSequelizeModelCreate = ModelDefined<Post, PostWithNoId>;

const PostModel: PostSequelizeModelCreate = db.define('post', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  likes: { type: DataTypes.INTEGER, allowNull: false },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: { key: 'id', model: 'users' }
  },
  posted: { type: DataTypes.DATE, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: 'posts',
  timestamps: false
});

// PostModel.hasOne()

export default PostModel;