### Federation_authentication(타사 인증)

- naver나 facebook 등의 잘 알려진 사이트의 아이디 인증으로 로그인 하도록 할 수 있도록함.

- federation authentication을 사용하면 거대 자본을 가진 회사의 인증과 보안 체계를 빌리며, 자사 서비스에서는 간단한 식별자만 가지고 있도록한다. 타사 인증을 위해서 인증 관리 모듈인 passport를 사용하면 손쉽게 구현이 가능하다.

- passport에서 언급 했듯이 passport에는 여러가지 Strategy를 제공한다. 일종의 플러그인과 같은 느낌으로 제공되며, 네이버, 구글, 카카오, 페이스북 등이 이에 속한다.

#### 페이스북 federation_authentication

- 페이스북 개발자 페이지 접속 후 로그인을 한다. 그리고 개발자 등록을 진행한다.

- my apps에 새로운 앱을 추가한다. 이로써 페이스북 앱이 추가되었다.

- 기본 설정에 들어가서 플랫폼을 추가한다. 우리는 웹 사이트를 만들것이다.

- 대시보드에 들어가서 앱 설정을 확인한다. 여기서 APP ID와 APP secret가 중요하다.APP ID는 공개되도 별 상관이 없지만 APP secret는 비밀번호에 해당하기 때문에 유출되면 안된다.

- passport 웹 페이지에 document-> providers -> facebook을 클릭하면 페이스북 로그인 인증을 사용하는 방법에 대한 메뉴얼이 나와있다.


#### 코드

- 모듈 추가 및 require
```
    npm install passport-facebook --save

    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;
```

- Route

```
    /* 
    * 해당 주소로 들어온 사용자는 facebook Strategy로 로그인 시킨다
    * post가 아니라 get으로 접근하는 것에 유의, 기존의 local 방식은 post 접근이었다.
    * 타사 인증시 보통 라우트가 2개이다. 이는 인증 과정에서 조금 더 정교한 보안을 위해 고안되었다.
    * 초기에는 passport가 페이스북 인증 페이지로 강제 리다이렉트 시키기 위한 라우트이며,
    * 두번째는 인증 완료를 위한 라우트이다.
    */
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/login' }));
```

- Strategy
```
    /* 여기서 APP_ID와 APP_SECRET를 자신이 만든 앱의 설정에서 가져와 붙여넣기한다.
    *  callbackURL이란 검증에 대한 url이다. 이 url을 route의 callback 주소와 동일하게 입력한다.
    *  
    *  인증이 완료되면 facebookStrategy의 두 번째 인자로 들어오는 콜백 함수가 실행된다.
    *  여기서 사용자의 정보는 profile 인자에 담긴다.
    *  따라서 콜백 함수 내부의 코드는 profile 정보를 기반으로 데이터베이스나 파일에 사용자가 있는지 찾아야한다.
    *  만약 찾는 과정이 끝났으면 done 함수를 호출하여 첫번째는 null, 두번째는 사용자 객체를 넣고
    *  찾지 못했으면 사용자를 생성하여 done 함수를 호출하여 첫번째는 null, 두번째는 사용자 객체를 넣어준다.
    */ 
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://www.example.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
        });
    }
    ));
```

- permission
```
    // email 등의 권한에 접근 허용을 위해서는 scope를 설정한다.
    app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' })
    );

    // 또한 facebookStrategy에 다음과 같이 profile fields를 추가한다.
    new FacebookStrategy({
        clientID: '1101366243328193',
        clientSecret: 'ab9c77db2aada1c52bb61257f258bc33',
        callbackURL: "/auth/facebook/callback",
        profileFields:['id','email','gender','link','locale','name','timezone','update_time
        ','verified','displayName']
    },
```