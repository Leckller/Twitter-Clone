import { DataTypes, Model, QueryInterface } from "sequelize"
import { Followers } from "../../types/followers.types";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Followers>>('followers', {
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
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('followers');
  },
}