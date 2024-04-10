import { DataTypes, Model, QueryInterface } from "sequelize"
import { Like } from "../../types/likes.type";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Like>>('likes', {
      id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      liked: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
      typePost: { type: DataTypes.BOOLEAN, allowNull: false, field: 'type_post' },
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
    },
    )
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('likes');
  },
}