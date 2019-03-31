var express = require('express');
var session =require('express-session');
var app = express();

// 미들웨어
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// 모듈
var User = require('./user');
var config = require('./config/config');

mongoose.connect(config.url, { useMongoClient: true });
// Mongoose: mpromise (mongoose’s default promise library) is deprecated, 
// plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

/* 세션 사용 선언 */
app.use(session({
  secret: 'cookierandom',   // 랜덤한 키값
  resave: false,            // 접근할 때마다 세션 아이디를 새로 발급하는 것을 설정하는 옵션(false가 권장)
  saveUninitialized: true   // 실제로 사용할때 까지는 세션 아이디를 발급하지 말라는 옵션(true가 권장)
}))
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req, res){
    var output = `<h1>Welcome to mongoose test page!</h1>
    <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
    </ul>`;
    res.send(output);
})

/* 로그인 페이지 */
app.get('/auth/login', function(req, res){
    var output = `<form action="/auth/login" method="post">
        <p><input type="text" name="name" placeholder="name"/></p>
        <p><input type="password" name="password" placeholder="password"/></p>
        <p><input type="submit"/></p>
    </form>`

    res.send(output);
})

app.post('/auth/login', function(req, res){
    // get the user starlord55
    User.find({ name: req.body.name }, function(err, users) {
    if (err) throw err;
    
    for(var i =0; i<users.length; i++){
        var user = users[i];
        
        if(user.password===req.body.password){
            req.session.username = user.username;
            req.session.save(function(){
                res.redirect('/welcome');
        });
        }else{
            res.redirect('/auth/login');
        }

        console.log(user);
    }
    });
})

/* 회원가입 페이지 */
app.get('/auth/register', function(req,res){
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
        req.session.username = newUser.username;
        res.redirect('/welcome');
    })
})

/* 로그아웃 페이지 */
app.get('/auth/logout', function(req, res){
    delete req.session.username;
    res.redirect('/');
})


/* 웰컴 메인 페이지 */
app.get('/welcome', function(req, res){
    
    if(req.session.username){
        var output = `<h2>welcome ${req.session.username}</h2>
        <p><a href="/auth/logout">logout</a></p>`
    }else{
        var output = `<h2>Who are you?</h2>
        <ul>
            <li><a href="/">main</a></li>
            <li><a href="/auth/login">login</a></li>
        </ul>`
    }
    res.send(output);
    
})

app.listen(3000, function(){
    console.log('start server on port 3000!');
})