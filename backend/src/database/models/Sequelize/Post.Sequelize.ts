import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '../index';
import SequelizeUser from "./User.Sequelize";

class SequelizePost extends Model<InferAttributes<SequelizePost>, InferCreationAttributes<SequelizePost>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare content: string;
  declare posted: Date;
}

SequelizePost.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
  content: { type: DataTypes.STRING, allowNull: false },
  posted: { type: DataTypes.INTEGER, allowNull: false, defaultValue: new Date() },
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
}, {
  sequelize: db,
  tableName: 'posts',
  underscored: true,
  timestamps: false,
})

SequelizeUser.hasMany(SequelizePost, { foreignKey: 'userId', as: 'userPost' });
SequelizePost.belongsTo(SequelizeUser, { foreignKey: 'userId' });

// Unico
SequelizePost.belongsTo(SequelizeUser, { foreignKey: 'userId', as: 'postUser' });

export default SequelizePost;