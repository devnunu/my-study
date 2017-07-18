var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
  secret: 'cookierandom',   // 랜덤한 키값
  resave: false,            // 접근할 때마다 세션 아이디를 새로 발급하는 것을 설정하는 옵션(false가 권장)
  saveUninitialized: true   // 실제로 사용할때 까지는 세션 아이디를 발급하지 말라는 옵션(true가 권장)
}))

app.get('/count', function(req,res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send('count : ' + req.session.count);
})

app.listen('3000',function(){
    console.log('server start on port 3000!');
})