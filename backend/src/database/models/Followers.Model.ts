import SequelizePost from "./Sequelize/Post.Sequelize";
import { Followers as FollowersType } from '../../types/followers.types'


interface followerMethods {
  follow(fields: Omit<FollowersType, 'id'>): void;
  unFollow(fields: Omit<FollowersType, 'id'>): void;
}

export default class FollowersModel implements followerMethods {
  private db = SequelizePost;


}