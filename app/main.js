var express = require('express')
  , ejsLocals = require('ejs-locals')
  , app = express()
  , pages = require(__dirname + '/controllers/pages')
  , bodyParser = require('body-parser')
  , mongoose = require("mongoose")
  , session = require('express-session')
  , MongoStore = require('connect-mongo')(session);

app.engine('ejs', ejsLocals)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  app.locals.route = req.url;
  next();
})
app.use(session({secret: 'i need more beers',
				resave: false,
				saveUninitialized: false,
  // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
				store: new MongoStore({ 
					url: 'mongodb://localhost:27017/session',
				})
}))

app.get('/', function (req, res) { res.redirect('home') })
app.get('/home', pages.home);
app.post('/registration', pages.registration); 
app.post('/login', pages.login);
app.post('/logout', pages.logout);
app.get('/admin', pages.admin);
app.get('/main', pages.main);
app.post('/edit', pages.edit);
app.post('/update', pages.update);

module.exports = app;