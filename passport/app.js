var express = require('express');
var app = express();
var main = require('./router/join/index');
var passport =  require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session =  require('express-session');
var flash = require('connect-flash');

app.listen(3000, function(){
  console.log("start server on port 3000!");
})

app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUnitialized : true
}))

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(main);
