var express = require('express');
var app = express();

app.listen(3000, function(){
    console.log("server start on port 3000");
})

app.use(express.static('public'));   

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/html/index.html");
})