const router = require('express').Router();
const { Comment, Post, User, Liked_Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET /api/comments - READ all comments
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id',
      'comment_text',
      'user_id',
      'post_id',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM liked_comment WHERE comment.id = liked_comment.comment_id)'
        ),
        'like_count'
      ]
    ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/comments - CREATE a comment
router.post('/', withAuth, (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE /api/comments/like - Like a comment
router.put('/like', withAuth, (req, res) => {
  Liked_Comment.create({
    user_id: req.session.user_id,
    comment_id: req.body.comment_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/comments/:id - DELETE a comment
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
