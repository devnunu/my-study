var express = require("express")
var app = express();
var router = express.Router(); // router set
var passport = require("passport")
var localStrategy = require("passport-local").Strategy;

router.get('/', function(req, res){
  res.render('join.ejs');
})

passport.use('local-join', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
    console.log('Callback function works!');
  }
));

router.post('/', passport.authenticate('local-join', {
  successRedirect: '/main',
  failureRedirect: '/join',  // done = false
  failureFlash: true,
}))

module.exports = router;
