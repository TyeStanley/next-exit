const router = require('express').Router();
const { Post, User, Comment, Like } = require('../../models');

const sequelize = require('../../config/connection');

// GET /api/posts - READ all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at'
      // like count to be added after likes have been setup
      
      // [
      //   sequelize.literal(
      //     '(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)',
      //     'like_count'
      //   )
      // ]
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/posts/:id - READ single post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at'
      // like count to be added after likes have been setup
      // [
      //   sequelize.literal(
      //     '(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)',
      //     'like_count'
      //   )
      // ]
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        included: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }

      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/posts - CREATE a post
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
