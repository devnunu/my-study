var express = require("express")
var app = express();
var router = require("./router/index")
var bodyParser = require("body-parser")

var passport = require("passport")
var localStrategy = require("passport-local").Strategy;
var session = require("express-session")
var flash = require("connect-flash")

app.listen(3000, function(){
  console.log("start! port3000!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(router)
