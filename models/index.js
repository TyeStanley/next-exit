// import all models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

User.belongsToMany(Post, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Like.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Like, {
  foreignKey: 'user_id'
});

Post.hasMany(Like, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Like, Comment };
