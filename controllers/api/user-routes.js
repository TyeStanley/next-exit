const router = require('express').Router();
const { User, Post, Like, Comment } = require('../../models');

// GET /api/users - read all users
router.get('/', (req, res) => {
  // Access user model
  User.findAll({
    attributes: { exclude: ['password'] }
    // include post once association is made
    // include: {
    //   model: Post,
    //   attributes: ['id', 'title', 'post_url', 'created_at']
    // }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_url', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
        through: Like,
        as: 'liked_posts'
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users - create a new user
router.post('/', (req, res) => {
  // expects { username, email, password }
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }) // will add server info here
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE /api/users/:id - update a user
router.put('/:id', (req, res) => {
  // expects { username, email, password }
  User.update(req.body, {
    where: {
      id: req.params.id
    },
    individualHooks: true
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// LOGIN /api/users/login - login authentication
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'Email not found' });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Invalid password' });
      }

      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: 'You are now logged in' });
      });

      res.json({ user: dbUserData, message: 'You are now logged in' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

LOGOUT / api / users / logout;
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
