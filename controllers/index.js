//router setup
const router = require('express').Router();

// connect to routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

// route paths
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

//invalid route request
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
