var express = require("express")
var app = express();
var router = express.Router(); // router set
var path = require("path")

var join = require("./join")


router.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "../public/join.html"));
})

router.use("/join", join)

module.exports = router
