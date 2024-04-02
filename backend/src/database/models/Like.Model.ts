import SequelizeLike from "./Sequelize/Like.Sequelize";

interface like {
  like(userId: number, postId: number): void,
  dislike(userId: number, postId: number): void,
}

export default class Like implements like {
  private model = SequelizeLike

  async like(userId: number, postId: number): Promise<void> {
    await this.model.create({ postId, userId });
  }

  async dislike(userId: number, postId: number): Promise<void> {
    await this.model.destroy({ where: { userId, postId } })
  }
}