var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var web3Provider = null;
var MyContract = null;
var contracts = {}
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
var contract = require("truffle-contract");
var path = require('path');
var EntityManagerJSON = require(path.join(__dirname, 'build/contracts/EntityManager.json'));


app.use(express.static("public"));
app.use(bodyParser.json())


// 초기화 함수
function initialize() {
	if (typeof web3 !== 'undefined') {
		// mist나 metamask 등의 web3가 가동 중일 때
		web3Provider = web3.currentProvider;
	} else {
		// web3 provider가 없을 떄
		web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
	}
	web3 = new Web3(web3Provider);

	MyContract = contract(EntityManagerJSON);
	MyContract.setProvider(web3Provider);
}

// 초기화 함수 실행
initialize();

app.listen(8080, function () {
	console.log('server start on port 8080');
});

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
})

app.post("/addUser", function (req, res) {
	var name = req.body.name;
	var age = req.body.age;
	var job = req.body.job;

	console.log(name, age, job)

	res.send('ok');

})

app.get("/getUsers", function (req, res) {
	MyContract.deployed().then(function(instance) {
		console.log(instance.getUsers.call());
	})

	res.send('getUsers api called');
})