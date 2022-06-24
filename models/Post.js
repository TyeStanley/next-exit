const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the Post model
class Post extends Model {}

module.exports = Post;