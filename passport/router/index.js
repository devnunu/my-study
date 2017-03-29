var express = require("express")
var app = express();
var router = express.Router();
var path = require("path")


var main = require("./main/main");
var join = require("./join/index");


router.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "../public/join.html"));
})

router.use("/join", join);
router.use("/main", main);

module.exports = router;
