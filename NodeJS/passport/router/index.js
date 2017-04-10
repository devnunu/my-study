var express = require("express")
var app = express();
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");

var login = require("./login/index")
var main = require("./main/main");
var join = require("./join/index");
var logout = require("./login/index")


router.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "../public/join.html"));
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
router.use("/join", join);
router.use("/main", main);
router.use("/login", login);
router.use("/logout", logout);

module.exports = router;
