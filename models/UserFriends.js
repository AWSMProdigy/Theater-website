const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Trip model
class UserFriends extends Model {}

// create fields/columns for Trip model
UserFriends.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    friend_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'friend',
        key: 'id',
        unique: false
      }
    },
    status: {
        type: DataTypes.INTEGER,   
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userFriends'
  }
);

module.exports = UserFriends;