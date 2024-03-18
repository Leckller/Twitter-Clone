import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import db from './index';
import { Comment } from "../../types/comment.types";

export type CommentWithNoId = Optional<Comment, 'id'>;
export type CommentSequelizeModel = Model<Comment, CommentWithNoId>;

type CommentSequelizeModelDefine = ModelDefined<Comment, CommentWithNoId>

const CommentModel: CommentSequelizeModelDefine = db.define('comment', {
  content: DataTypes.STRING,
  likes: DataTypes.INTEGER,
  postId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
}, {
  timestamps: false,
  tableName: 'comments',
  underscored: true,
});

export default CommentModel;