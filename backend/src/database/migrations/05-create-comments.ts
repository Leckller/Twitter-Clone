import { DataTypes, Model, QueryInterface } from "sequelize"
import { Comment } from "../../types/comment.types";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Comment>>('comments', {
      id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      commented: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
      content: { type: DataTypes.STRING(340), allowNull: false },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'post_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id', model: 'posts'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id', model: 'users'
        }
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('comments');
  },
}