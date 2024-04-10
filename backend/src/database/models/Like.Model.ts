import SequelizeLike from "./Sequelize/Like.Sequelize";

interface like {
  like(userId: number, postId: number, typePost: boolean): void,
  dislike(userId: number, postId: number, typePost: boolean): void,
}

export default class LikeModel implements like {
  private model = SequelizeLike

  async like(userId: number, postId: number, typePost: boolean): Promise<void> {
    await this.model.create({ postId, userId, typePost, liked: new Date() });
  }

  async dislike(userId: number, postId: number, typePost: boolean): Promise<void> {
    await this.model.destroy({ where: { userId, postId, typePost } })
  }
}