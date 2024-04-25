import SequelizePost, { PostModelType } from "./ModelsSequelize/Post.Sequelize";
import { Post as PostType } from '../../types/posts.types'
import UserModelSequelize from './ModelsSequelize/User.Sequelize'

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

  async getGlobalPosts(page: number): Promise<PostModelType[]> {

    const limit = 10;
    const actPage = page ? Number(page) * limit : 0;

    const posts = await this.db.findAll({
      order: [['posted', 'DESC']],
      limit: limit,
      offset: actPage,
      include: [{
        model: UserModelSequelize,
        as: 'postUser',
        required: true,
        attributes: ['tagName', 'customName', 'picture']
      }]
    })
    return posts;
  }
}