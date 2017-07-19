### passport js

- 공식 홈페이지 : http://passportjs.org/

- passport js라는 모듈은 인증을 쉽게 구현할 수 있도록 구현한 모델이다. 그러나 passport를 사용하는 것은 결과적으로 인증을 쉽게 할수 있지만 passport 자체는 인증을 사용자가 직접 구현하는것 보다 어려울 수 있다. 왜냐하면 오늘 날에는 인증을 한가지 방법만 사용하지 않기 때문이다. 다시 말해, 요즘은 facebook이나 google, kakao, naver 등의 사용자 정보를 이용해서 자신의 홈페이지에 인증시키는 방법을 많이 사용하기 때문이다. 이를 'federation authentication'(타사 인증)이라고 한다.

- passport를 이용해서 얻는 효용은 다음과 같다. 다양한 인증 방법을 어플리케이션에서 수용해야한다면 인증을 제공하는 업체들에 맞춰 코딩을 해야하지만, passport는 이 구현 방법을 통합해준다. 이를 통해 어플리케이션의 복잡성은 낮아지고 구현의 시간도 짧아지게 된다.

- passport는 여러가지 인증 방식을 통합 했기 때문에 상당히 복잡하다. 따라서 반복을 통해 동작 원리를 터득하도록 하자.

- passport의 특징으로는 Stretegy(전략)이라는 것을 가지고 있는데 federation authentication을 구현하기 위하여 각 기업 마다 strategy 모듈을 가지고 있다. 예를 들어 passport-facebook이나 passport-twitter등이 이에 속한다. 따라서 이러한 '전략'을 통하여 각종 매체의 인증이 가능하다.

- 만약 업체가 아닌 사용자 홈페이지의 회원 가입 페이지를 사용한다면 passport-local을 사용하면 된다. 말그대로 local에서 사용하는 passport라는 뜻이다. 

- passport는 공통의 절차가 있고, stretegy에 따라 세분화 된다. local은 사용자의 아이디와 패스워드를 입력해서 로그인하는 전략이다.

#### 패스포트를 사용하기 위하여 필요한 모듈
1) passport
2) passport-local

- 공통 절차
```
// 모듈 import 
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

// 미들웨어 사용 선언
app.use(passport.initialize()); // 패스포트 초기화
app.use(passport.session());    // 세션 사용 선언, 반드시 세션 사용 선언 뒤쪽에 붙어야 함

```


#### passport-local Stretegy

- form
```
    <form action="/auth/login" method="post">
        <div>
            <label>Username:</label>
            <input type="text" name="username"/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password"/>
        </div>
        <div>
            <input type="submit" value="Log In"/>
        </div>
    </form>
```

- Route
```
    // 함수가 실행되면 콜백 함수를 리턴한다.
    // post 방식으로 /auth/login에 접근하면 처리를 passport.authenticate에 위임한다.
    // 여기서 failureFlash는 인증에 실패했다고 딱 한번만 메세지를 보낼수 있는 기능이다. 여기서는 사용하지 않는다.
    
    app.post('/auth/login',
    passport.authenticate('local', { successRedirect: '/welcome',
                                    failureRedirect: '/auth/login',
                                    failureFlash: false })
    );

```

- Stretegy 설정 코드
```
    /* 
    *  위에서 설정한 라우터 내부 passport.authenticate의 첫번째 인자가 local이기 때문에
    *  passport.use의 new LocalStrategy() 객체에 로그인 처리를 담으면 된다.
    *  다시 말해, route에서 /auth/login 경로로 접근시 passport에게 처리를 위임했는데, local 전략을 사용하므로
    *  passport.use의 Localstrategy()에 등록되어있는 콜백 함수가 호출되도록 약속된 것이다.
    *  여기서 콜백 함수는 3개의 인자를 받는데, 이 인자값을 가지고 사용자가 로그인 되어있는지, 실제 사용지인지 여부를
    *  판별하게 된다.
    *  콜백 함수의 username, password는 각각 form에서 사용자가 입력한 값이 그대로 들어가게 된다.
    *
    *  done이라고 하는 인자에는 함수가 담겨있다. done의 첫번째 인자는 null, 두번째는 login된 사용자 정보를 담은 *  객체, 세번째는 메세지를 가지고 있는 객체를 넣어준다. 만약 flash를 true로 설정했다면 세번째 메세지 인자가 
    *  다음페이지에서 보여진다. 따라서 이 인자는 옵션이다.
    *  첫 번째 인자인 null은 에러가 발생했을 때 사용하는 인자이며, 복잡하기 때문에 여기서는 사용하지 않는다.
    *
    */
    
    passport.use(new LocalStrategy(
        function(username, password, done){
            var uname = username;
            var pwd = password;

            // 해당 사용자가 파일이나 데이터 베이스에 있는지 확인해야한다.
            // 코드는 달라질 수 있고 중요한 것은 자신이 사용하는 요소에 
            // '사용자가 있는지 없는지' 체크하는 코드를 짜야한다. 이에 따라 조건문이 분기한다. 
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
    ))

```

- serialize
```
    /*
    *  done 함수가 호출되면 다음단계로 넘어가게 된다. 바로 세션을 만드는 일이다.
    *  만약 done의 두번째 인자가 user라면 passport.serializeUser의 콜백 함수가 실행된다.
    *  이 콜백 함수의 첫번째 인자의 user라는 값은 done의 2번째 인자로 전달된 값으로 약속되었다.
    *  그리고 serializeUser의 두번째 인자는 done이며, 콜백 함수 내부에서 done에 첫번째 인자는 null,
    *  두번째 인자는 user를 식별할 수 있는 고유의 식별 값(id나 username 등)을 넣어준다.
    *  (중요한 것은, LocalStrategy의 done과 selializeUser의 done은 이름만 같을 뿐 다른 함수이다.)
    *  이렇게 하면 세션에 식별 값에 대한 정보가 저장된다!
    *  따라서 다음에 방문을 하더라도 세션값에 따라 사용자 정보가 유지된다.
    *  
    *  만약 세션값이 srializeUser로 저장되었고, 사용자가 다시 한번 로그인이 필요한 페이지를 방문한다면
    *  그때부터는 deserializeUser가 호출된다. 그리고 deserializeUser의 콜백 함수의 첫 번째인자는
    *  serializeUser에서 설정한 세션의 고유한 식별값이 들어온다. 
    *  따라서 이 id 값을 기준으로 사용자를 검색하는 작업을 수행해야한다.
    *  사용자를 검색해서 찾았을경우 done 함수를 다시 호출하고 두번째 인자로 user 정보가 들어있는 객체를 넘긴다.
    */
 
    // 사용자의 세션을 생성해준다. 세션을 생성하는 처음 딱 한번만 실행
    passport.serializeUser(function(user, done) {
        return done(null, user.username);
    });

    // 사용자가 세션을 가지고 페이지에 접근할 때 마다 실행된다.
    passport.deserializeUser(function(id, done) {
        for(var i =0; i<users.length; i++){
            var user = users[i];
            if(user.username===id){
                return done(null, user);
            }
        }
    });
```


- 세션이 만들어졌지만 passport가 세션을 관리하므로, req.session으로 접근하는 것이 아니라 passport로 접근 해야한다.

- req.user에 유저의 정보가 저장되어있다. 이 정보는 deserializeUser의 done에서 두번째 인자로 전달된 user 값이다.


#### logout

- logout의 경우, req.logout()메소드를 사용하면 세션이 사라지면서 로그아웃이 완료된다.

```
    /* 로그 아웃 */
    app.get('/auth/logout', function(req, res){
        req.logout();
        res.redirect('/welcome');
    });
```

#### 회원 가입 완료 후 login 처리

- 또한 회원 가입이 완료되고 바로 login처리를 할 수 있는데, req.login() 메소드를 사용하면된다. 여기서 첫번째 인자는 user의 정보가 들어가고, 두번째는 로그인 완료 후 실행될 콜백함수가 들어가게된다. 이 콜백 함수 내부에 redirection 메소드를 넣으면 로그인 후 페이지 리다이렉션이 실행된다.

```
    app.post('/auth/register', function(req,res){
        hasher({password:req.body.password}, function(err, pass, salt, hash){
            var user = {
                username:req.body.username,
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
```