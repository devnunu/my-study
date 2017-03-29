var express = require("express")
var app = express();
var router = express.Router();
var mysql = require("mysql")
var passport = require("passport")
var localStrategy = require("passport-local").Strategy;

// DATABASE SETTING
var connection = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "14858",
  database : "jsman"
})
connection.connect();

router.get('/', function(req, res){
  var msg;
  var errMsg = req.flash('error');
  if(errMsg) msg = errMsg;
  res.render('join.ejs', {'message' : msg});
})

passport.serializeUser(function(user, done){
  console.log("passport session save :", user)
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log("passport session get id :", id)
  done(null, id);
});


passport.use('local-join', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
    var query = connection.query('select * from user where email = ?', [email], function(err, rows){
      if(err) return done(err);
      if(rows.length){
        console.log('exist user');
        return done(null, false,{message: 'your email is already used'})
      }else{
        var sql = {email:email, password:password}
        var query = connection.query('insert into user set ?', sql, function(err,rows){
          if(err) {throw err};
          return done(null, {'email':email,'id' :rows.insertId})
        })

      }
    })
  }
));

router.post('/', passport.authenticate('local-join', {
  successRedirect: '/main',
  failureRedirect: '/join',
  failureFlash: true,
}))

module.exports = router;
