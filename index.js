const express = require('express');
const session = require('express-session');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const authFile = require('./auth.js');
const userFile = require('./users.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('./'));
app.use(session({
  secret: 'hey man',
  resave: false,
  saveUninitialized: true
}));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

function authentiKate(req, username, password, res) {
  console.log("Kate connected.")
  var authentiKated = userFile.users.find(function (user) {
  if (username === user.username && password === user.password) {
    console.log("user authenticated.")
    res.render('index');
    authentiKated = true;
  } else {
    console.log("access denied, brah")
    res.send("access denied, brah")
  }
  });
};

app.get('/', function(req, res) {
  if (authentiKated === true) {
    res.render('index')
  } else {
    res.render('login')
  }
});

app.get('/login', function(req, res) {
  res.render('login')
});

app.post('/', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  authentiKate(req, username, password, res);
});

app.listen(3000, function(req, res) {
  console.log("Site login app started")
});
