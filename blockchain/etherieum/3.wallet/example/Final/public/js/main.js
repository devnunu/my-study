// 시드 생성
function generate_seed()
{
	// 새로운 시드, 12 문자의 랜덤 시드 생성
	var new_seed = lightwallet.keystore.generateRandomSeed();

	// seed input에 새로 생성된 new_seed를 넣는다.
	document.getElementById("seed").value = new_seed;

	generate_addresses(new_seed);
}

var totalAddresses = 0;

function generate_addresses(seed)
{
	// 시드값이 있는지 검증
	if(seed == undefined)
	{
		// 없다면 seed 내부의 값을 넣음
		seed = document.getElementById("seed").value;
	}

	// 시드가 BIP39 사양에 따라 유효한 12 단어 시드인지 확인
	if(!lightwallet.keystore.isSeedValid(seed))
	{
		document.getElementById("info").innerHTML = "Please enter a valid seed";
		return;
	}

	totalAddresses = prompt("How many addresses do you want to generate");

	// total address가 숫자가 아닐 경우
	if(!Number.isInteger(parseInt(totalAddresses)))
	{
		document.getElementById("info").innerHTML = "Please enter valid number of addresses";
		return;
	}

	// 랜덤 함수로 pw 생성
	var password = Math.random().toString();

	// 새로운 lightwallet 키 스토어를 작성하기위한 인터페이스
	lightwallet.keystore.createVault({
		password: password,
	  	seedPhrase: seed	// 옵셔널, 12단어의 시드 문구 제공
	}, function (err, ks) {
			// 내부적으로 구성된 salt를 사용하여 적절한 pwDerivedKey를 반환
			// 사용자의 암호를 입력 받아 키 저장소를 암호화 / 암호 해독하는 데 사용되는 Uint8Array 유형의 대칭 키를 생성.
	  	ks.keyFromPassword(password, function (err, pwDerivedKey) {
	    	if(err) // 에러처리
	    	{
	    		document.getElementById("info").innerHTML = err;
	    	}
	    	else
	    	{
					// 지정된 값만큼의 address 생성
	    		ks.generateNewAddress(pwDerivedKey, totalAddresses);
	    		var addresses = ks.getAddresses();
	    		
	    		var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

	    		var html = "";

	    		for(var count = 0; count < addresses.length; count++)
	    		{
					var address = addresses[count];
					// 파생 키가 주어지면 주소에 해당하는 개인 키를 암호 해독하고 반환합니다.
					var private_key = ks.exportPrivateKey(address, pwDerivedKey);
					var balance = web3.eth.getBalance("0x" + address);

					html = html + "<li>";
					html = html + "<p><b>Address: </b>0x" + address + "</p>";
					html = html + "<p><b>Private Key: </b>0x" + private_key + "</p>";
					html = html + "<p><b>Balance: </b>" + web3.fromWei(balance, "ether") + " ether</p>";
		    		html = html + "</li>";
	    		}

	    		document.getElementById("list").innerHTML = html;
	    	}
	  	});
	});
}

function send_ether()
{
	var	seed = document.getElementById("seed").value;

	if(!lightwallet.keystore.isSeedValid(seed))
	{
		document.getElementById("info").innerHTML = "Please enter a valid seed";
		return;
	}

	var password = Math.random().toString();

	lightwallet.keystore.createVault({
		password: password,
	  	seedPhrase: seed
	}, function (err, ks) {
	  	ks.keyFromPassword(password, function (err, pwDerivedKey) {
	    	if(err)
	    	{
	    		document.getElementById("info").innerHTML = err;
	    	}
	    	else
	    	{
	    		ks.generateNewAddress(pwDerivedKey, totalAddresses);

	    		ks.passwordProvider = function (callback) {
			      	callback(null, password);
			    };

			    var provider = new HookedWeb3Provider({
  					host: "http://localhost:8545",
  					transaction_signer: ks
				});

			    var web3 = new Web3(provider);

			    var from = document.getElementById("address1").value;
				var to = document.getElementById("address2").value;
			    var value = web3.toWei(document.getElementById("ether").value, "ether");

			    web3.eth.sendTransaction({
			    	from: from,
			    	to: to,
			    	value: value,
			    	gas: 21000
			    }, function(error, result){
			    	if(error)
			    	{	
			    		document.getElementById("info").innerHTML = error;
			    	}
			    	else
			    	{
			    		document.getElementById("info").innerHTML = "Txn hash: " + result;
			    	}
			    })
	    	}
	  	});
	});
}