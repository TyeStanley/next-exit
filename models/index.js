// import all models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Liked = require('./Liked');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.belongsToMany(Post, {
    through: Liked,
    as: 'liked_posts',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
    through: Liked,
    as: 'liked_posts',
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Liked.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Liked.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Liked, {
    foreignKey: 'user_id'
});

Post.hasMany(Liked, {
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

module.exports = { User, Post, Liked, Comment };
