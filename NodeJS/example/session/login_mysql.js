var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var app = express();

/* 세션 사용 선언 */
app.use(session({
  secret: 'cookierandom',   // 랜덤한 키값
  resave: false,            // 접근할 때마다 세션 아이디를 새로 발급하는 것을 설정하는 옵션(false가 권장)
  saveUninitialized: true,   // 실제로 사용할때 까지는 세션 아이디를 발급하지 말라는 옵션(true가 권장)
  store : new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'session_test'
  })
}))

app.use(bodyParser.urlencoded({extended:false}));


/* 로그 아웃 */
app.get('/auth/logout', function(req, res){
    delete req.session.displayName;
    res.redirect('/welcome');
});

/* 로그인 성공시 리다이렉션 페이지 */
app.get('/welcome', function(req, res){
    // 성공적으로 로그인 했을 때
    if(req.session.displayName){
        res.send(`
            <h1>Hello ${req.session.displayName}</h1>
            <a href="/auth/logout">logout</a>
            `);
    }
    // 로그인 없이 리다이렉션 페이지에 접근 했을 때
    else{
        res.send(`<h1>Welcome</h1>
        <a href="/auth/login">login</a>`);
    }
    
})

/* 로그인 처리 post 라우터 */
app.post('/auth/login',function(req, res){
    var uname = req.body.username;
    var pwd = req.body.password;
    var user = {
        username:'nunu',
        password:'111',
        displayName : 'Nam Eun Woo'
    };
    
    // 해당 유저가 존재할 경우 메인페이지로 리다이렉션
    if(uname===user.username&&pwd===user.password){
        req.session.displayName = user.displayName;
        res.redirect('/welcome');
    }
    // 해당 유저가 존재하지 않을 경우 login 페이지로 안내
    else{
        res.send('There is no user <a href="/auth/login">login</a>');
    }
});

/* 로그인 페이지 */
app.get('/auth/login',function(req, res){
    var output = `
        <h1>Login</h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username"/>
            </p>
            <p>
                <input type="password" name="password" placeholder="password"/>
            </p>
            <p>
                <input type="submit"/>
            </p>
        </form>
    `;
    res.send(output);
})

app.listen('3000',function(){
    console.log('server start on port 3000!');
})