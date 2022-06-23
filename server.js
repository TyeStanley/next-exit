const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// import utils
const helpers = require('./utils/helpers');

// handlebars config
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// session config
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'super secret secret',
  coockie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use path
app.use(express.static(path.join(__dirname, 'public')));

// use session
app.use(session(sess));

// add handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
// app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
