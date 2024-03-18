import { DataTypes, Model, QueryInterface } from "sequelize"
import { Post } from "../../types/posts.types";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Post>>('posts', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' } },
      likes: { type: DataTypes.INTEGER, allowNull: false },
      posted: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      updated: { type: DataTypes.DATE, allowNull: false },
    }, {});
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('posts');
  }
}