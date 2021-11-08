const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class movieToShow extends Model {}

movieToShow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    heroImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "dune-hero.jpg"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    runtime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    showtime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Movie description"
    },
    noSpaces: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movieToShow',
    }
);

module.exports = movieToShow;