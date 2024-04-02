import { DataTypes, Model, QueryInterface } from "sequelize"
import { Post } from "../../types/posts.types";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Post>>('posts', {
      id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      likes: { type: DataTypes.INTEGER, allowNull: false },
      posted: { type: DataTypes.DATE, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
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
    return queryInterface.dropTable('posts');
  },
}