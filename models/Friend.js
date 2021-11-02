const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Friend extends Model {}

Friend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'friend',
  }
);

module.exports = Friend;
