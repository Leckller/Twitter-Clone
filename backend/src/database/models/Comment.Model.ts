import SequelizePost from "./Sequelize/Post.Sequelize";
import { Comment as CommentType } from '../../types/comment.types'


interface commentMethods {
  newComment(fields: CommentType): CommentType;
  deleteComment(id: number, userId: number): void;
}

export default class CommentModel implements commentMethods {
  private db = SequelizePost;
}