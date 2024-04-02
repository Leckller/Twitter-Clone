import { DataTypes, Model, ModelDefined, Optional } from "sequelize"
import { Post } from "../../types/posts.types"
import db from './index';
import UserModel from "./User.model";

export type PostWithNoId = Optional<Post, 'id'>;
export type PostSequelizeModel = Model<Post, PostWithNoId>;

type PostSequelizeModelCreate = ModelDefined<Post, PostWithNoId>;

const PostModel: PostSequelizeModelCreate = db.define('post', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  likes: { type: DataTypes.INTEGER, allowNull: false },
  posted: { type: DataTypes.DATE, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: { key: 'id', model: 'users' }
  },
}, {
  tableName: 'posts',
  timestamps: false
});

// Muitos
UserModel.hasMany(PostModel, { foreignKey: 'userId', as: 'userPost' });
PostModel.belongsTo(UserModel, { foreignKey: 'userId' });

// Unico
PostModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'postUser' });

export default PostModel;