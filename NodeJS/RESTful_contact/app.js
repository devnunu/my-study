var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');

var dummy = null;

const ERR_MSG = "ERROR";
const CONFIRM_MSG = "OK";

app.listen('3000', function () {
    console.log("server start on port 3000!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

fs.readFile('./contact.json', 'utf8', (err, data) => {
    if (err) throw err;
    dummy = JSON.parse(data).data;
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/main.html'));
});

app.get('/getContactList', function (req, res) {
    let responseText ="";

    dummy.forEach(function (val) {
        let name = val.name;
        let number = val.number;
        let template = `<div class="row list">
                        <div class="col-md-3 name">${name}</div>
                        <div class="col-md-5 number">${number}</div>
                        <div class="col-md-2 edit">수정</div>
                        <div class="col-md-2 delete">삭제</div>
                    </div>`;

        responseText += template;
    });

    res.send(responseText);
});

app.get('/getUser/:name', function (req, res) {
    var compareName = req.params.name;

    let responseText = {};
    responseText.msg = ERR_MSG;

    dummy.forEach(function (val) {
        let name = val.name;
        let number = val.number;

        if(compareName === name){
            let template = `<div class="row list">
                                <div class="col-md-4 name">${name}</div>
                                <div class="col-md-8 number">${number}</div>
                            </div>`;

            responseText.template = template;
            responseText.msg = CONFIRM_MSG;
            return;
        }
    });

    res.json(responseText);
});

app.post('/addUser', function(req, res){
    let data = {name:req.body.name, number:req.body.number};
    let result = { data : undefined };

    dummy.push(data);
    result.data = dummy;
    result = JSON.stringify(result);

    fs.writeFile('contact.json', result, 'utf8', function(err) {
        if(err!==null){
            console.log("에러입니다");
            return;
        }
    });
});

app.delete('/deleteUser/:name', function(req, res){
    let name = req.params.name,
        number = req.body.number,
        result = { data : undefined },
        responseText = {msg: ERR_MSG};

    for(let i = 0; i<dummy.length; i++){
        let dataName = dummy[i].name;
        let dataNumber = dummy[i].number;

        if((dataName===name)&&(dataNumber===number)){
            dummy.splice(i,1);
            responseText.msg = CONFIRM_MSG;
            break;
        }
    }

    result.data = dummy;
    result = JSON.stringify(result);

    fs.writeFile('contact.json', result, 'utf8', function(err) {
        if(err!==null){
            console.log("에러입니다");
            return;
        }
        JSON.stringify(responseText);
        res.json(responseText);
    });
});