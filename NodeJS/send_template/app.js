var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/main.html');
})

app.post('/',function(req,res){
  res.render('template',{txt1:"hi",txt2:"welcome"})
})

app.listen(3000, function(){
  console.log("Start server on port 3000");
})
