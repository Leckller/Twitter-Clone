import { DataTypes, Model, QueryInterface } from "sequelize"
import { User } from "../../types/users.types"

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<User>>('users', {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      tagName: { type: DataTypes.STRING(16), allowNull: false, unique: true },
      customName: { type: DataTypes.STRING(20), allowNull: false },
      description: { type: DataTypes.STRING(200), allowNull: true, defaultValue: 'i love ruytter!' },
      picture: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING(20), allowNull: false },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
}