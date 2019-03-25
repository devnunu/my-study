
### 보안

- 보안에 있어서 아이디와 비밀번호를 그대로 노출하는것은 상당히 위험하다. 이 때문에 암호화 방식이 중요하게 여겨진다. 암호화 되어있지 않은 텍스트를 '평문'이라고 한다.

#### 단방향 암호화(md5)

- 암호화는 가능하고 복호화가 불가능할 때 이를 단방향 암호화 방식이라고 한다. 이 때 암호화 된 코드를 '해시'라고 한다. md5는 단방향 암호화 방식이다. 그러나 너무 방식이 낡아서 잘 사용하지 않는다.

- npm install md5 --save

- 단방향 암호화를 사용하기 위해서는 입력으로 들어온 비밀번호를 암호화 시킨 다음, 저장된 값과 비교하면 된다. 저장된 값은 미리 암호화 되었기 때문에 일치한다면 정확하게 로그인이 가능해진다. 즉, 저장된 값도 md5를 거치고, 사용자가 입력한 값도 md5를 거쳐서 같은 값인지만 확인한다.

- md5는 기계의 빠른 연산을 통해 복호화가 가능하므로 보안적으로 상당히 취약하다. 따라서 잘 사용하지 않게 된다. 이를 해결하기 위한 방법으로 'salt'를 사용한다. 기존의 비밀 번호에 salt를 사용하여 단방향 암호화 한다면 경우의 수가 무궁무진하게 늘어나기 때문에 복호화가 어렵게 된다. 사용자가 입력한 값과 비교 할때도 마찬가지로 입력값과 salt를 더해 암호화 해 준다. salt는 암호화에 있어서 key라고 할 수 있으며, 기존의 비밀번호에 소금을 친다는 뜻으로 생각하면 된다.

- md5에 salt를 사용할 때 문제점은, 동일한 비밀번호를 사용할 때이다. 컴퓨팅 파워가 좋은 컴퓨터(클라우드)를 이용해서 일일히 대입을 한다면, 느리긴 해도 보안이 뚫릴 가능성이 있다. 즉, 한명의 비밀번호가 노출 될 경우 다른 사람의 비밀번호까지 노출된다는 것이다.

- 다시 이를 해결하기 위한 방법으로, 사용자마다 각기 다른 salt를 사용하는 방법이 있다. 입력 값을 비교할 때도 각자 사용자의 salt값을 적용해준다.

#### 각 유저마다 다른 salt의 적용 사례

```
    var users = [{
        username : 'nunu1',
        password : '111',
        salt : 'aisjdfli!@#ilsjd',
        disPlayName : 'supernunu'
    },
    {
        username : 'feti',
        password : '129',
        salt : '!@#alijsdfasdfe',
        disPlayName : 'pytifeti'
    }]
    
    ...

    app.post('/auth/login', function(res, req){
        var uname = req.body.username;
        var pwd = req.body.password;
        
        for(var user in users){
            if(uname===user.username&& md5(pwd+user.salt)===user.password){
                res.redirect('/main');
            }
        }
        
    })
```



#### 단방향 암호화(sha)

- md5는 설계상의 결함들이 발견되었기 때문에 오늘날에는 이를 암호화로 사용하지 말라고 권장한다. 따라서 현재는 sha를 추천하지만 암호화 기법이라는 것은 세월이 지남에 따라 불안정해 질수 있으므로 암호화 사용 여부는 사용자가 판단해야한다.

- npm install sha256 --save (만약 더 높은 수준의 보안을 원한다면 sha512로 설치하면 된다)

- sha.js 참조, sha256으로 암호화 할 경우 md5보다 더 긴 암호문을 발생시킨다. 이는 md5 보다 sha256이 더욱 복잡하고 정교한 암호체계를 가지고 있다는 뜻이다. 

#### 키 스트레칭(PBKDF2)

- 키 스트레칭 이란 암호화를 수 천번, 수 만번 진행하는것을 말한다. 이를 위해서 사용하는 함수가 여러가지 있는데, 그 중 PBKDF2를 사용하도록 해보자.

- npm install pbkdf2-password --save

```
    var bkfd2Password = require("pbkdf2-password");
    var hasher = bkfd2Password();

    var users = [{
        username : 'nunu',
        password : '111',
        salt : 'aisjdfli!@#ilsjd',
        disPlayName : 'supernunu'
    },
    {
        username : 'feti',
        password : '129',
        salt : '!@#alijsdfasdfe',
        disPlayName : 'pytifeti'
    }]
    
    ...

    app.post('/auth/login', function(res, req){
        var uname = req.body.username;
        var pwd = req.body.password;
        
        for(var user in users){
            if(uname===user.username){
                return hasher({password:pwd, salt:user.salt}, function(err, pass, salt, hash) {
                    if(hash===user.password){
                        // 같은 사용자
                        req.session.displayName = user.displayName;
                        req.session.save(function(){
                            res.redirect('/welcome');
                        })
                    }else{
                        // 같지 않은 사용자
                        res.send('who are you?<a href="/auth/login">login</a>')
                    }
                });
            }
        }
    }
```


