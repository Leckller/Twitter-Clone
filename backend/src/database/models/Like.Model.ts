import SequelizeLike from "./Sequelize/Like.Sequelize";

interface like {
  like(userId: number, postId: number, like: boolean): void,
}

export default class Like implements like {
  private model = SequelizeLike

  async like(userId: number, postId: number, like: boolean): Promise<void> {
    await this.model.create({ post_id: postId, user_id: userId });
  }
}