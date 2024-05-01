import { Followers as FollowersType } from '../../types/followers.types'
import SequelizeFollower from "./ModelsSequelize/Followers.Sequelize";


interface followerMethods {
  follow(fields: Omit<FollowersType, 'id'>): Promise<void>;
  unFollow(fields: Omit<FollowersType, 'id'>): Promise<void>;
}

export default class FollowersModel implements followerMethods {
  private db = SequelizeFollower;

  async follow(fields: Omit<FollowersType, 'id'>): Promise<void> {
    const { followedId, followingId } = fields;
    await this.db.create({ followedId, followingId });
  }

  async unFollow(fields: Omit<FollowersType, 'id'>): Promise<void> {
    const { followedId, followingId } = fields;
    await this.db.destroy({ where: { followedId, followingId } });
  }
}