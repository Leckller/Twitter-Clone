import { QueryInterface, Model, DataTypes } from "sequelize"
import { User } from "../../types/users.types"

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<User>>('users', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      endereco: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      pictureUrl: { type: DataTypes.STRING, allowNull: false, defaultValue: 'default' },
      name: { type: DataTypes.STRING, allowNull: false },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
}