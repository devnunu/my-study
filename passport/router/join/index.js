var express = require('express');
var app = express();
var router =  express.Router();
var path = require('path');
var mysql = require('mysql');
var passport =  require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

router.get('/',function(req, res){
  res.render('join.ejs');
})

passport.use('local-join', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done){
  console.log('local-join callback called');
  }
));

module.exports = router;
