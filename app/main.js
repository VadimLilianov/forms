var express = require('express')
  , ejsLocals = require('ejs-locals')
  , app = express()
  , pages = require(__dirname + '/controllers/pages')
  , bodyParser = require('body-parser');

app.engine('ejs', ejsLocals)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  app.locals.route = req.url;
  next()
})


app.get('/', function (req, res) { res.redirect('home') })
app.get('/home', pages.home);
app.post('/calc', pages.calc); 
module.exports = app;