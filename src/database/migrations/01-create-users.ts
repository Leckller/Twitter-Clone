import { QueryInterface, Model, DataTypes } from "sequelize"
import { User } from "../../types/users.types"

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<User>>('users', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      endereco: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      pictureUrl: { type: DataTypes.BLOB, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
}