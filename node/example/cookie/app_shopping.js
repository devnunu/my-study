var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')

// 임의의 쿠키 값 부여
app.use(cookieParser('chococookie'));

// 데이터베이스 대신 배열을 생성
var products = {
    1:{title:'the history of web'},
    2:{title:'the next web'},
};

app.get('/products', function(req, res){
    var output = '';
    for(var name in products){
        output +=`
        <li>
            <a href="/cart/${name}">${products[name].title}</a>
        </li>`;
    }
    res.send(`<h1>Product</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});


/*
cart = {
    1:2,
    2:1,
}
*/
app.get('/cart/:id', function(req, res){
    var id = req.params.id;
    
    // 암호화된 쿠키 값
    if(req.signedCookies.cart){
        var cart = req.signedCookies.cart;
    }else{
        var cart = {};
    }

    if(!cart[id]){
        cart[id] = 0;
    }
    
    cart[id] = parseInt(cart[id]) + 1;
    
    // 암호화하여 쿠키 저장
    res.cookie('cart',cart,{signed:true});
    res.redirect('/cart');
})

app.get('/cart',function(req, res){
    var cart = req.signedCookies.cart;
    if(!cart){
        res.send('Empty!');
    } else{
        var output = '';
        for(var id in cart){
            output += `<li>${products[id].title} (${cart[id]})</li>`;
        }
    }
    res.send(`
        <h1>Cart</h1>
        <ul>${output}</ul>
        <a href="/products">Products list</a>`);
})

app.listen('3000', function(){
    console.log('server start on port 3000');
});