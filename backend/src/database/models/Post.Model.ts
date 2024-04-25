import SequelizePost from "./ModelsSequelize/Post.Sequelize";
import { Post as PostType } from '../../types/posts.types'


interface post {
  createPost(newPost: PostType): Promise<Omit<PostType, 'id'>>;
  deletePost(postId: number): Promise<void>;
}

export default class PostModel implements post {
  private db = SequelizePost;

  async createPost(newPost: Omit<PostType, 'id'>): Promise<PostType> {
    const { content, posted, userId } = newPost;
    const post = await this.db.create({ content, posted, userId });
    return post.dataValues;
  }

  async findPostById(postId: number): Promise<PostType | undefined> {
    const post = await this.db.findOne({ where: { id: postId } });
    if (!post) return undefined;
    return post.dataValues;
  }

  async deletePost(postId: number): Promise<void> {
    await this.db.destroy({ where: { id: postId } });
  }
}