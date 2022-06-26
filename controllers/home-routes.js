const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Like } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  res.render('homepage', {
    posts,
    loggedIn: req.session.loggedIn
  });
    
});