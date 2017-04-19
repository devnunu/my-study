var express = require('express');
var app = express();

var options = require('./src/option');

var loginData = {
        host: options.storageConfig.HOST,
        user: options.storageConfig.user,
        password: options.storageConfig.password
};

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: loginData.host,
  port:3306,
  user:loginData.user,
  password:loginData.password,
  database:'octodog'
})
connection.connect();

app.use(express.static('public'));

app.listen(3000,function(){
  console.log("server start on port 3000!");
})

app.get('/', function(req,res){
  res.sendFile(__dirname+'/public/main.html');
});

app.post('/', function(req, res){
  var responseData = {};

  var query =  connection.query('select score from scoreboard where uid="ma" ORDER BY num DESC limit 10', function(err,rows){
    responseData.score = [];
    if(err) throw err;
    if(rows[0]){
      responseData.result = "ok";
      rows.forEach(function(val){
        responseData.score.push(val.score);
      })
    }
    else{
      responseData.result = "none";
      responseData.score = "";
    }
    res.json(responseData);
  });
});
