import { QueryInterface, Model, DataTypes } from "sequelize";
import { Comment } from "../../types/comment.types";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Comment>>('comments', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      content: { type: DataTypes.STRING, allowNull: false },
      likes: { type: DataTypes.INTEGER, allowNull: false },
      postId: { type: DataTypes.INTEGER, allowNull: false, field: 'post_id', references: { model: 'posts', key: 'id' } },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' } },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('comments');
  },
}