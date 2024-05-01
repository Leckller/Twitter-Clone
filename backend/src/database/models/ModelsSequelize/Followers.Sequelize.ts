import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import db from '../index';
import { Followers } from "../../../types/followers.types";

export type FollowerWithNoId = Optional<Followers, 'id'>;
export type FollowerModelType = Model<Followers, FollowerWithNoId>;
type FollowerSequelizeCreate = ModelDefined<Followers, FollowerWithNoId>;

const SequelizeFollower: FollowerSequelizeCreate = db.define('Follower', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  followedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'followed_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      key: 'id', model: 'users'
    }
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'following_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      key: 'id', model: 'users'
    }
  }
}, {
  tableName: 'followers',
  timestamps: false
});

export default SequelizeFollower;