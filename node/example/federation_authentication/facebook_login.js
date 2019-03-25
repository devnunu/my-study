var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session); // 인자로 세션을 전달함, 즉 의존 관계를 인자로 전달
var passport = require('passport')
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


var app = express();

var users = [{
        authId : 'local:nunu',
        username : 'nunu',
        password : 'atCOaxyLvtFLkXWQL4SXVK4kcoHI6m4sW/lpJ17sfjHJQo77XvAwYPFiLCz97dn3Ioit3naP1gHz7UjyEqp0L/31JPTyTa1oE+0btXQ5e4391IUtUeLVs8mCAHmTsSdSeUMyOzCzj2B+kh/zyxTAsK+8yMYBmxmnsFgVReLQBXo=',
        salt : 'aisjdfli!@#ilsjd',
        displayName : 'supernunu'
    },
    {
        authId : 'local:feti',
        username : 'feti',
        password : 'YYbMDImxWSjd46IBkg6gH9wbnWlkJDnkJPrXLT+x32bpo5HjkTSgkMsseK8GlXR06jvuy4awL0zyt/OQr0gPZdi4+9K38EEJtZHGF3B4LpLlv9+rxJfnIR7tTfYAr80ynfTC1YGd2Ev65rtnymO7T9H3TpMWrs3din7/TJutUCU=',
        salt : '!@#alijsdfasdfe',
        displayName : 'pytifeti'
}]

/* 세션 스토어 사용 선언 */
app.use(session({
  secret: 'cookierandom',       // 랜덤한 키값
  resave: false,                // 접근할 때마다 세션 아이디를 새로 발급하는 것을 설정하는 옵션(false가 권장)
  saveUninitialized: true,      // 실제로 사용할때 까지는 세션 아이디를 발급하지 말라는 옵션(true가 권장)
  store: new FileStore() // store가 가리키고 있는 파일에 세션값 저장, 세션 스토어 설정
}))

app.use(passport.initialize()); // 패스포트 초기화
app.use(passport.session());    // 세션 사용 선언, 반드시 세션 사용 선언 뒤쪽에 붙어야 함
app.use(bodyParser.urlencoded({extended:false}));

passport.serializeUser(function(user, done) {
        return done(null, user.authId);
    });

passport.deserializeUser(function(id, done) {
    for(var i =0; i<users.length; i++){
        var user = users[i];
        if(user.authId===id){
            return done(null, user);
        }
    }
    done('There is no user');
});

passport.use(new LocalStrategy(
        function(username, password, done){
            var uname = username;
            var pwd = password;

            for(var i = 0; i<users.length; i++){
                var user = users[i];
                if(uname === user.username){
                    return hasher({password:pwd, salt:user.salt}, function(err, pass, salt, hash) {
                        if(hash===user.password){
                            // 같은 사용자
                            // 로그인 절차가 끝났음을 알리고, 유저 객체를 전달
                            done(null, user);
                        }else{
                            // 같지 않은 사용자
                            // 로그인 절차가 끝났음을 알리고, 로그인이 실패 했음을 알림
                            done(null, false);
                        }
                    });
                }
            }
            // 로그인 절차가 끝났음을 알리고, 로그인이 실패 했음을 알림
            done(null, false);
        }
    ));

passport.use(new FacebookStrategy({
        clientID: '1101366243328193',
        clientSecret: 'ab9c77db2aada1c52bb61257f258bc33',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.dir(profile);
        var authId = 'facebook:'+profile.id;

        for(var i =0; i<users.length; i++){
            var user = users[i];
            if(user.authId===authId){
                return done(null, user);
            }
        }

        var newUser = {
            authId:authId,
            displayName:profile.displayName,
        }

        users.push(newUser);
        done(null, newUser);
    }
));

/* 로그 아웃 */
app.get('/auth/logout', function(req, res){
    req.logout();
    req.session.distory();
    res.redirect('/welcome');
});

/* 로그인 성공시 리다이렉션 페이지 */
app.get('/welcome', function(req, res){
    console.log('user:'+req.user);
    // 성공적으로 로그인 했을 때
    if(req.user&&req.user.displayName){
        res.send(`
            <h1>Hello ${req.user.displayName}</h1>
            <a href="/auth/logout">logout</a>
            `);
    }
    // 로그인 없이 리다이렉션 페이지에 접근 했을 때
    else{
        res.send(`<h1>Welcome</h1>
        <ul>
            <li><a href="/auth/login">Login</a></li>
            <li><a href="/auth/register">Register</a></li>
        </ul>`);
    }
    
})

/* 로그인 처리 post 라우터 */
// 함수가 실행되면 콜백 함수를 리턴한다.
// post 방식으로 /auth/login에 접근하면 처리를 passport.authenticate에 위임한다.
// 여기서 failureFlash는 인증에 실패했다고 딱 한번만 메세지를 보낼수 있는 기능이다. 여기서는 사용하지 않는다.
app.post('/auth/login',
passport.authenticate('local', { successRedirect: '/welcome',
                                failureRedirect: '/auth/login',
                                failureFlash: false })
);

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
        <a href="/auth/facebook">Facebook</a>
    `;
    res.send(output);
})

/* 회원 가입 처리 페이지 */
app.post('/auth/register', function(req,res){
    hasher({password:req.body.password}, function(err, pass, salt, hash){
        var user = {
            username:'local:'+req.body.username,
            password:hash,
            salt:salt,
            displayName:req.body.displayName
        };
        users.push(user);
        req.login(user, function(){
            req.session.save(function(){
                res.redirect('/welcome');
            })
        });
        
    });
})

/* 회원 가입 페이지 */
app.get('/auth/register', function(req, res){
    var output = `
    <h1>register</h1>
    <form action="/auth/register" method="post">
        <p>
            <input type="text" name="username" placeholder="username"/>
        </p>
        <p>
            <input type="password" name="password" placeholder="password"/>
        </p>
        <p>
            <input type="text" name="displayName" placeholder="displayName"/>    
        </p>
        <p>
            <input type="submit"/>
        </p>
    </form>`
    res.send(output);
})

/* 페이스북 인증 페이지 연결 */
app.get('/auth/facebook', passport.authenticate('facebook'));

/* 페이스북 인증 처리 콜백 */
app.get('/auth/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/welcome',
                                    failureRedirect: '/auth/login' }));

app.listen('3000',function(){
    console.log('server start on port 3000!');
})