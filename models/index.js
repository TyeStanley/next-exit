// import all models
const Post = require('./Post');
const User = require('./User');
const Like = require('./Like');
// const Rating = require('./Rating');
const Comment = require('./Comment');

// create associations

module.exports = { User, Post, Like, Comment };
