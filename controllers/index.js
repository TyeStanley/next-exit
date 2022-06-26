//router setup
const router = require('express').Router();

// connect to routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// route paths
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//invalid route request
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
