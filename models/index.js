// import all models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Liked_Post = require('./Liked_Post');
const Liked_Comment = require('./Liked_Comment');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

User.belongsToMany(Post, {
  through: Liked_Post,
  as: 'liked_posts',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
  through: Liked_Post,
  as: 'liked_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Comment, {
  through: Liked_Comment,
  as: 'liked_comments',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsToMany(User, {
  through: Liked_Comment,
  as: 'liked_comments',
  foreignKey: 'comment_id',
  onDelete: 'SET NULL'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Liked_Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Liked_Post.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Liked_Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Liked_Comment.belongsTo(User, {
  foreignKey: 'comment_id',
  onDelete: 'SET NULL'
});

User.hasMany(Liked_Post, {
  foreignKey: 'user_id'
});

Post.hasMany(Liked_Post, {
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

User.hasMany(Liked_Comment, {
  foreignKey: 'user_id'
});

Comment.hasMany(Liked_Comment, {
  foreignKey: 'comment_id'
});

module.exports = { User, Post, Liked_Post, Comment, Liked_Comment };
