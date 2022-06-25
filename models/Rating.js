const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reputation: {
      type: DataTypes.INTEGER,
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('reputation.stars')), 'avgRating'],
      ],
      references: {
        model: 'user',
        key: 'id'
      },
      unique: true
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      },
      allowNull: false
    }
  }
);

module.exports = Rating;
