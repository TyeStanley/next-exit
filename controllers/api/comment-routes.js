const router = require('express').Router();
const { Comment, Post, User, Liked } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/comments - READ all comments
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: ['id', 'comment_text', 'user_id', 'post_id']
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
router.put('/like', (req,res) => {
  
})

// DELETE /api/comments/:id - DELETE a comment
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(504).json(err);
    });
});

module.exports = router;
