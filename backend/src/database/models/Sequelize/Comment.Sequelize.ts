import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '../index';

class SequelizeLike extends Model<InferAttributes<SequelizeLike>, InferCreationAttributes<SequelizeLike>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare postId: number;
  declare content: string
  declare commented: Date
}

SequelizeLike.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  content: { type: DataTypes.STRING(340), allowNull: false, field: 'content' },
  commented: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date(), field: 'commented' },
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
}, {
  sequelize: db,
  underscored: true,
  tableName: 'comments',
  timestamps: false
});

export default SequelizeLike;