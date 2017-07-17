var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')

app.use(cookieParser());

// count 라는 쿠키를 저장하고 있다가 count경로로 접근할 때마다 1씩 증가
app.get('/count',function(req, res){
    // 쿠키가 없다면 초기화 있다면 쿠키값을 받아옴
    if(req.cookies.count){
        var count = parseInt(req.cookies.count);
    }else{
        var count = 0;
    }
    
    res.cookie('count',count+1);
    res.send('count: ' + req.cookies.count);
})

app.listen('3000', function(){
    console.log('server start on port 3000');
});