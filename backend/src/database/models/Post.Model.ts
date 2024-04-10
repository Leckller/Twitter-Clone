import SequelizePost from "./Sequelize/Post.Sequelize";
import { Post as PostType } from '../../types/posts.types'


interface post {
  createPost(newPost: PostType): PostType;
  deletePost(postId): void;
}

export default class PostModel implements post {
  private db = SequelizePost;


}