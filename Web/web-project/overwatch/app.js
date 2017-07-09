var express = require('express');
var app = express();

app.listen(3000, function(){
    console.log("server start on port 3000");
})

app.use(express.static('public'));   
app.set('view engine', 'ejs'); 

app.get('/', function(req, res){
    res.render('index');
})

app.get('/about', function(req, res){
    res.render('about');
})