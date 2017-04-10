var express = require('express');
var app = express();

app.listen(3000, function(){
  console.log("server start on port 3000");
})

app.set("view engine", "ejs");

// index page
app.get('/', function(req, res) {
    res.render('main');
});

// about page
app.get('/about', function(req, res) {
    res.render('about');
});
