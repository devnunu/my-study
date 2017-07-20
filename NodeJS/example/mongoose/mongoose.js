var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var User = require('./user');

var config = require('./config/config');

mongoose.connect(config.url, { useMongoClient: true });
// Mongoose: mpromise (mongoose’s default promise library) is deprecated, 
// plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req, res){
    var output = `<form action="/auth/register" method="post">
        <p><input type="text" name="name" placeholder="name"/></p>
        <p><input type="text" name="username" placeholder="username"/></p>
        <p><input type="password" name="password" placeholder="password"/></p>
        <p><input type="submit"/></p>
    </form>`
    res.send(output);
})

app.post('/auth/register', function(req,res){
    var newUser = new User({
        name:req.body.name,
        username:req.body.username,
        password:req.body.password,
    })
    
    newUser.save(function(err){
        if(err) throw err;
        console.log('user save successfully!');
        res.redirect('/welcome');
    })

    
})

app.get('/welcome', function(req, res){
    res.send('welcome!');
})

app.listen(3000, function(){
    console.log('start server on port 3000!');
})